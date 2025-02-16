import { html, css, appendNode } from "./lib/html.js";

import "./icon.js";

class VideoSlice extends HTMLElement {
  /** @type {import("@ffmpeg/ffmpeg").FFmpeg} */
  #ffmpeg;
  #file;
  #fileInput;
  #video;
  #cleanup;
  #container;
  #overlay;
  #statusLine;
  static styles() {
    return css`
      :host {
        position: relative;
        display: block;
      }
      .container {
        display: grid;
        place-content: center;
        aspect-ratio: 16 / 9;
        background: linear-gradient(to bottom, var(--media-bg, #001f3f), black);
        object-fit: contain;
        flex-shrink: 0;
      }
      label {
        display: inline-flex;
        background-color: #f1f1f1;
        padding: 5px 8px;
        border: 1px solid #ccc;
        border-radius: 4px;
        font-size: small;
        align-items: center;
        gap: 4px;
        &:hover {
          background-color: #f9f9f9;
        }
      }
      video {
        width: 100%;
        height: 100%;
      }
      input {
        position: absolute;
        left: -99999rem;
      }
      .overlay {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 1;
        pointer-events: none;
      }
      .status-line {
        display: inline-block;
        background: rgba(0, 0, 0, 0.5);
        color: lime;
        padding: 4px;
        max-width: 100%;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
      }
      .status-line.error {
        color: red;
      }
    `;
  }
  static emptyTemplate() {
    return html`<label aria-role="button">
      <input type="file" />
      <oui-icon name="film"></oui-icon> Upload
    </label>`;
  }
  static videoTemplate() {
    return html`<div>
      <video controls></video>
    </div>`;
  }
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.initDOM();
  }
  initDOM() {
    this.shadowRoot.innerHTML = "";
    this.shadowRoot.appendChild(VideoSlice.styles());
    this.#container = appendNode(this.shadowRoot, "div", {
      class: "container",
    });
    this.#overlay = appendNode(this.shadowRoot, "div", { class: "overlay" });
    this.#statusLine = appendNode(this.#overlay, "div", {
      class: "status-line",
    });
    this.setFile(null);
  }
  disconnectedCallback() {
    if (this.#cleanup) {
      this.#cleanup();
    }
  }
  handleFileSelected = (event) => {
    const file = event.target.files[0];
    this.setFile(file);
  };
  get file() {
    return this.#file;
  }
  set file(value) {
    this.setFile(value);
  }
  /**
   * @param {File} file
   */
  setFile = async (file) => {
    try {
      this.#file = file;
      if (this.#cleanup) {
        this.#cleanup();
        this.#cleanup = null;
      }
      this.#container.innerHTML = "";
      if (this.#file) {
        const domCleanup = this.initVideoDOM();
        const fileURL = await this.loadVideoAsPreview();
        this.#cleanup = () => {
          domCleanup();
          if (fileURL) {
            URL.revokeObjectURL(fileURL);
          }
        };
        const metadata = await this.probeVideo();
        this.logStatus("video metadata analyzed");
      } else {
        this.#cleanup = this.initEmptyDOM();
      }
    } catch (err) {
      this.setError(err);
    }
  };

  initEmptyDOM() {
    const template = VideoSlice.emptyTemplate().cloneNode(true);
    this.#container.appendChild(template);
    this.#fileInput = this.#container.querySelector("input");
    this.#fileInput.addEventListener("change", this.handleFileSelected);
    return () => {
      this.#fileInput.removeEventListener("change", this.handleFileSelected);
      this.#fileInput = null;
    };
  }

  async initVideoDOM() {
    const template = VideoSlice.videoTemplate().cloneNode(true);
    this.#container.appendChild(template);
    this.#video = this.#container.querySelector("video");
    return () => {
      this.#video = null;
    };
  }

  /**
   *
   * @param {File} file
   * @returns {Promise<void>}
   */
  async loadVideoAsPreview() {
    return new Promise((resolve, reject) => {
      // Create a temporary URL for the file
      const fileURL = URL.createObjectURL(this.#file);

      // Set the URL as the video source
      this.#video.src = fileURL;
      this.#video.load();

      // Optionally, revoke the object URL after the video is loaded
      this.#video.onloadeddata = (event) => {
        resolve(fileURL);
      };
      this.#video.onerror = (err) => {
        this.setError(err);
        resolve(null);
      };
    });
  }

  /**
   *
   * @returns {Promise<import("./video-slice-types").FFProbeOutput>}
   */
  async probeVideo() {
    const start = Date.now();
    this.logStatus("starting initialization of file" + this.#file.name);
    const ffmpegPromise = this.loadFFmpeg();
    const inputFileName = this.#file.name;
    const outputFileName = this.#file.inputFileName + ".info.txt";
    const fileContentBytesPromise = this.#file
      .arrayBuffer()
      .then((buf) => new Uint8Array(buf));
    const [_, fileContentBytes] = await Promise.all([
      ffmpegPromise,
      fileContentBytesPromise,
    ]);
    this.logStatus("loaded ffmpeg");
    this.logStatus(`completed in ${Date.now() - start}ms`);
    await this.#ffmpeg.writeFile(this.#file.name, fileContentBytes);
    const ffprobeArgs = [
      "-v",
      "quiet",
      "-print_format",
      "json",
      "-show_format",
      "-show_streams",
      inputFileName,
      "-o",
      outputFileName,
    ];
    await this.#ffmpeg.ffprobe(ffprobeArgs);
    const data = await this.#ffmpeg.readFile(outputFileName);
    const decoder = new TextDecoder("utf-8");
    const dataString = decoder.decode(data);
    return JSON.parse(dataString);
  }

  /**
   * @returns {Promise<import("@ffmpeg/ffmpeg").FFmpeg>}
   */
  async loadFFmpeg() {
    if (this.#ffmpeg) {
      return this.#ffmpeg;
    }
    const [
      { FFmpeg },
      { default: workerUrl },
      { default: coreUrl },
      { default: coreWasmUrl },
    ] = await Promise.all([
      import("@ffmpeg/ffmpeg"),
      import("@ffmpeg/ffmpeg/worker?url"),
      import("@ffmpeg/core?url"),
      import("@ffmpeg/core/wasm?url"),
    ]);

    const ffmpeg = new FFmpeg({ log: true });
    await ffmpeg.load({
      coreURL: coreUrl,
      wasmURL: coreWasmUrl,
      workerURL: workerUrl,
      classWorkerURL: new URL(workerUrl, import.meta.url).toString(),
    });
    return (this.#ffmpeg = ffmpeg);
  }
  setError(err) {
    this.#statusLine.textContent = String(err);
    this.#statusLine.classList.add("error");
  }
  logStatus(message) {
    this.#statusLine.textContent = message;
    this.#statusLine.classList.remove("error");
  }
}

customElements.define("oui-video-slice", VideoSlice);
