.. _making-requests:

---------------
Making requests
---------------

Request types
=============

At your disposal you have two types of requests. You can use either an instant request, which should fulfill as fast as possible or schedule a delayed request, performed at a specific point of time in the future.

Instant requests
~~~~~~~~~~~~~~~~

To perform instant request you need to call :code:`request(string _url)` method in :code:`Oracle` contract passing as it's only parameter url wrapped in a format type you want to get back. More about format types in `Response formats`_ section.

Delayed requests
~~~~~~~~~~~~~~~~

To perform request, which will be executed in the future you need to call :code:`delayedRequest(string url, uint delay)` method in :code:`Oracle` contract passing as it's first parameter wrapped url and amount of time you need to wait before execution.

The delay parameter can be given in two ways: as a unix timestamp or as a relative number of seconds. Using both options you can delay a request for a maximum of 2 years from now.

Request sources
===============

Currently we support only open REST API sources. In the future we plan to implement:

- IPFS
- random data
- closed APIs


Response formats
================

Currently we support JSON, XML and HTML formats. In the future we plan to support also raw binary data.

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

Response error codes
====================

When your requests can be fulfilled succesfully you would get value with error code equals to 0. Any non zero error code means that the request failed to process. Any three-digit code is standard HTTP status code, proxied from the HTTP client. Four-digit errors come from the Gardener server and are listed in the table below.

========================== ========== ===========
Error name                 Error code Description
========================== ========== ===========
INVALID_URL                1000       Text between type(...) wrapper isn't valid url
INVALID_CONTENT_TYPE       1001       This response format wrapper isn't supported
INVALID_SELECTOR           4000       The selector isn't valid JsonPath or XmlPath
NO_MATCHING_ELEMENTS_FOUND 4004       No elements found for given selector
INTERNAL_SERVER_ERROR      5000       Unhandled error happens inside Gardener Server
========================== ========== ===========
