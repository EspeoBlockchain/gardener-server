FROM sebvaucher/sgx-base:sgx_2.5

# Add SGX SDK libs to source
RUN /bin/bash -c "source /opt/intel/sgxsdk/environment"

# Install nodejs
RUN apt-get update -q -q && \
    apt-get install libssl1.0-dev nodejs nodejs-dev node-gyp npm --yes

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
