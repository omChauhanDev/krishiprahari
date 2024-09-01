#!/bin/bash

# Download and install Python
curl https://www.python.org/ftp/python/3.9.7/Python-3.9.7.tgz | tar xz
cd Python-3.9.7
./configure --prefix=$VERCEL_OUTPUT_DIR
make
make install

# Install required Python packages
$VERCEL_OUTPUT_DIR/bin/pip3 install tensorflow numpy pillow

# Copy your model file to the output directory
cp /var/task/backend/model/resnet_from_scratch.h5 $VERCEL_OUTPUT_DIR/