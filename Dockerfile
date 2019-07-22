FROM sebvaucher/sgx-base:sgx_2.5

# Add SGX SDK libs to source. It does what 'source /opt/intel/sgxsdk/environment' does
ENV SGX_SDK /opt/intel/sgxsdk
ENV PATH=$SGX_SDK/bin:$SGX_SDK/bin/x64:$PATH \
    PKG_CONFIG_PATH=$SGX_SDK/pkgconfig:$PKG_CONFIG_PATH \
    LD_LIBRARY_PATH=$SGX_SDK/sdk_libs:./libs:$LD_LIBRARY_PATH

# Install nodejs dependencies
RUN apt-get update -q -q && \
    apt-get install curl libssl1.0-dev --yes

# Install nodejs v11
RUN curl -sL https://deb.nodesource.com/setup_11.x | bash -
RUN apt-get install -y nodejs
RUN npm install npm --global

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm install

# Bundle app source
COPY . .

CMD [ "npm", "start" ]
