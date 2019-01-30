---------------
Making requests
---------------

Request types
=============

You have at your disposal two types of requests. You can use either request, which should fulfill as fast as possible or make a schedule one at some point of time in a future.

Instant requests
~~~~~~~~~~~~~~~~

To perform instant request you need to call :code:`request(string _url)` method in :code:`Oracle` contract passing as it's only parameter url wrapped in a format type you want to get back. More about format types here.

Delayed requests
~~~~~~~~~~~~~~~~

To perform request, which will be executed in a future you need to call :code:`delayedRequest(string url, uint delay)` method in :code:`Oracle` contract passing as it's first parameter wrapped url and amount of time you need to wait before execution.

You can pass delay parameter in two ways, as a unix timestamp or as a relative number of seconds. Both options you can set as 2 years from now at maximum.

Request sources
===============

Currently we support only open REST API sources. In the future we plan to implement:

- IPFS
- random data
- closed APIs


Response formats
================

Currently we support JSON, XML and HTML formats. In the future we plan to support only raw binary data.

JSON format
~~~~~~~~~~~

To parse and select response in a JSON format use JSON(...) wrapper. You can also query response following JsonPath.

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
    error: 404

XML format
~~~~~~~~~~

To parse and select response in a XML format use XML(...) wrapper. You can also query response following XPath.


Example request
::

    xml(http://samples.openweathermap.org/data/2.5/weather?q=London&mode=xml&appid=b6907d289e10d714a6e88b30761fae22)/current/temperature/@value


Example response
::

    value: "280.15"
    error: 0

HTML format
~~~~~~~~~~~

To parse and select response from HTML site use HTML(...) wrapper. You can also query response following XPath.

Example request
::

    html(https://espeoblockchain.com)/title


Example response
::

    value: "Blockchain Consulting - Espeo Blockchain"
    error: 0

