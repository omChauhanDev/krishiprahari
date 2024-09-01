#!/bin/bash

# Download pre-built Python binary
mkdir -p $VERCEL_OUTPUT_DIR/python
curl -L https://github.com/vercel/python-build/releases/download/3.9.13/python-3.9.13-linux-x64.tar.gz | tar xz -C $VERCEL_OUTPUT_DIR/python

# Set up PATH
export PATH=$VERCEL_OUTPUT_DIR/python/bin:$PATH

# Install required Python packages
$VERCEL_OUTPUT_DIR/python/bin/pip3 install --target $VERCEL_OUTPUT_DIR/python/lib/python3.9/site-packages tensorflow numpy pillow

# Copy your model file to the output directory
mkdir -p $VERCEL_OUTPUT_DIR/model
cp backend/model/resnet_from_scratch.h5 $VERCEL_OUTPUT_DIR/model/ || echo "Model file not found"

# Print Python version and path for debugging
$VERCEL_OUTPUT_DIR/python/bin/python3 --version
which python3