.. _making-requests:

---------------
Making requests
---------------

Request types
=============

You have two types of requests at your disposal. You can use either an instant request, which should fulfill as fast as possible or schedule a delayed request, performed at a specific point of time in the future.

Instant requests
~~~~~~~~~~~~~~~~

To perform instant request you need to call :code:`request(string _url)` method in :code:`Oracle` contract passing as its only parameter an url wrapped in a format type you want to get back. More about format types in `Response formats`_ section.

Delayed requests
~~~~~~~~~~~~~~~~

To perform request, which will be executed in the future you need to call :code:`delayedRequest(string url, uint delay)` method in :code:`Oracle` contract passing as it's first parameter wrapped url and amount of time you need to wait before execution.

The delay parameter can be given in two ways: as a unix timestamp or as a relative number of seconds. Using both options you can delay a request for a maximum of 2 years from now.

Request sources
===============

Currently we support following request sources:

- open REST api
- random data

In the future we plan to implement:

- IPFS
- closed APIs


Response formats
================

For REST api responses, we support JSON, XML and HTML formats. In the future we plan to support also raw binary data.

JSON format
~~~~~~~~~~~

To parse and select response in a JSON format use the json() wrapper. You can also query response following JsonPath.

.. note::

    :code:`json(...)` wrapper is treated as :code:`$` in JsonPath. Omit it when constructing request. In order to fetch :code:`sth` parameter from response make following request
    :code:`json(...).sth` (instead of :code:`json(...)$.sth`).

Example request
::

    json(https://api.coindesk.com/v1/bpi/currentprice.json).chartName


Example response
::

    value: "Bitcoin"
    error: 0

Example request with error
::

    json(https://api.coindesk.com/v1/bpi/currentprice.json).sth


Example response with error
::

    value: ""
    error: 4004

XML format
~~~~~~~~~~

To parse and select response in a XML format use the xml() wrapper. You can also query response following XPath.

.. note::

    To make selected response a valid well-formed XML if the result is an array of nodes they are wrapped in a :code:`<resultlist>` tag.
    Moreover if any of these results is a raw value it's also wrapped in a :code:`<result>` tag.

Example request
::

    xml(http://samples.openweathermap.org/data/2.5/weather?q=London&mode=xml&appid=b6907d289e10d714a6e88b30761fae22)string(/current/temperature/@value)


Example response
::

    value: "280.15"
    error: 0

HTML format
~~~~~~~~~~~

To parse and select response from HTML site use the html() wrapper. You can also query response following XPath.

Example request
::

    html(https://www.w3schools.com)/html/head/title/text()


Example response
::

    value: "W3Schools Online Web Tutorials"
    error: 0

ENCRYPTED url fragments
~~~~~~~~~~~

For all URL datasources (XML, HTML, JSON) it is also possible to encrypt entirety, part or parts of your query using encrypted() tag. You might want to do that if you wouldn't like some parts of your URL to be visible to everyone on blockchain. An obvious example would be using some API key as a parameter to your REST query.
In order to pass part of your query secretly, simply encrypt it using Gardener public key and wrap it in encrypted() tag. Gardener will decrypt it using its private key and then process it as usual.
Any assymetric encryption implementation may be used as long as it produces a stringified version of a following object: {iv, ephemPublicKey, ciphertext, mac} . We recommend using https://www.npmjs.com/package/eth-crypto as shown below.

Example request encryption
::

import EthCrypto from 'eth-crypto';

const gardenerPublicKey = '9c691b945b14656b98edbf4d3657290c65cad377bca44da4d54e88cd2bbdefb2e063267b06183029fea5017567653c0fb6c4e3426843381ad7e09014b2d384cf' // if you want to create it programmatically, derive it from Gardener address or Gardener private key if you are owner of the instance
const cipher = await EthCrypto.encryptWithPublicKey(gardenerPublicKey, 'SECRET_DATA');
constEncryptedSecret = EthCrypto.cipher.stringify(cipher);

Example request
::

    json(https://api.coindesk.com/v1/bpi/historical/close.json?currency=encrypted(c317e44653b8cc3e3ca7f6d9686711c60269a5fd41490868ad8b9cc054836af9d074670241860036e3534fddd6dd73995f14c211da51478025ffb45d9f53b8abb7e681700d13c0d58c0a441fdfd5c6dc57810b451c607338c0851cdc8066421968)).disclaimer
    json(https://api.coindesk.com/v1/bpi/historical/close.json?currency=encrypted(c317e44653b8cc3e3ca7f6d9686711c60269a5fd41490868ad8b9cc054836af9d074670241860036e3534fddd6dd73995f14c211da51478025ffb45d9f53b8abb7e681700d13c0d58c0a441fdfd5c6dc57810b451c607338c0851cdc8066421968)&someOtherParam=encrypted(someOtherEncryptedValue)).disclaimer


Example response
::

    value: "This data was produced from the CoinDesk Bitcoin Price Index. BPI value data returned as EUR."
    error: 0

RANDOM datasource
~~~~~~~~~~~

Random numbers can be generated using either random.org service or a dedicated SGX application. This is configurable by setting SGX_ENABLED in your .env file to either true or false.
There are many benefits of generating random numbers using SGX. We haven't fully leveraged this exciting technology, but after we do, every number will be securely and verifiably generated with the ONLY Third Trusted Party being Intel. That's right, you don't even have to trust whoever hosts a Gardener instance! This is further explained in our article: https://medium.com/gardeneroracle/random-number-generation-in-gardener-1660e5c25e00 . You are also read up about Intel SGX technical details, this is a good starting point: https://software.intel.com/en-us/sgx
Using SGX requires a specific hardware and OS (is your environment compatible? check it here https://github.com/ayeks/SGX-hardware) as well as SGX PSW installed. If you don't feel like doing that, you are welcome to use a random.org source which can be considered a less secure but easy to use fallback option.

.. note::

    In order to switch between SGX and random.org way of generating random numbers, use SGX_ENABLED in your .env file.

To generate a random value use the random() wrapper with inclusive upper and lower bounds specified.
Both of these bounds should be integers. For random.org acceptable bounds are [-1000000000,1000000000] while for SGX they are defined by 8-byte long datatype: [-9223372036854775808, 9223372036854775807]

Example requests
::

    random(10,20)
    random(-2,33)
    random(-124354325432,-34325253)


Example response
::

    value: 13
    error: 0

    value: -2
    error: 0

    value: -9532532335
    error: 0

Response error codes
====================

When your requests can be fulfilled succesfully you would get value with error code equals to 0. Any non zero error code means that the request failed to process. Any three-digit code is standard HTTP status code, proxied from the HTTP client. Four-digit errors come from the Gardener server and are listed in the table below.

========================== ========== ===========
Error name                 Error code Description
========================== ========== ===========
INVALID_URL                1000       Text between type(...) wrapper isn't valid url
INVALID_CONTENT_TYPE       1001       This response format wrapper isn't supported
INVALID_ENCRYPTION         1002       Invalid encrypted data. This probably means your data was not encrypted using Gardener public key.
INVALID_SELECTOR           4000       The selector isn't valid JsonPath or XmlPath
NO_MATCHING_ELEMENTS_FOUND 4004       No elements found for given selector
INTERNAL_SERVER_ERROR      5000       Unhandled error happens inside Gardener Server
========================== ========== ===========
