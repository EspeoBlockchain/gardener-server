-------------
Prerequisites
-------------

Before you start using Gardener, you may wish to check if that you have all requirements installed on your platform.

Docker
========

Docker toolbox can be downloaded
`here <https://docs.docker.com/toolbox/>`__.

You can verify if you have successfully installed docker by running the following command.


  docker ---version

Node
========
**[Optional]** If you want to run Gardener server without docker container then Node.js is needed. Node is available and you can download it
`here <https://nodejs.org>`__.

Make sure you have successfully installed it by typing in command line

  node ---version

.. note::
   Keep in mind that your Node.js version has to be at least 7.6 as gardener uses async/await pattern.

.. note::
   Please make sure to have Python 2.7.16 (not newer!) installed. Reason for that is node-ffi library that we use is not compatible with newest Python.

