#!/bin/bash

echo ""
echo "Development Setup"
echo "=============================="
echo ""

# Node
#
NODE_VERSION=$(which node)
if [ -z $NODE_VERSION ]; then
  echo "Please install node.js (http://nodejs.org)"
  exit 1
fi
echo "-> Installing node packages"
npm install
echo "--> node packages installed."

# Bower
#
echo ""
echo "-> Installing bower packages"
BOWER=$(which bower)
if [ -z $bower ]; then
  npm install -g bower
fi
bower install
echo "--> bower packages installed."
echo ""

# Gulp
#
echo "--> Installing global build tools"
npm install -g gulp
echo ""

# Pre-Commit Hooks
#
echo "--> Initializing pre-commit hooks"
cp tools/pre-commit .git/hooks/pre-commit
chmod +x .git/hooks/pre-commit

echo ""
echo "--> Configuration Complete!"
echo ""
