# iroha-rest-server
A REST server to interact with Hyperledger Iroha blockchain platform

## Description

This REST server is built using TypeScript, to interact with the Hyperledger Iroha blockchain platform.

Iroha Docs
https://iroha.readthedocs.io/

This REST server makes use customized version of the Iroha library iroha-helpers, 
called iroha-helpers-ts(the instructions for running both packages are exactly the same, the package name is just different).

iroha-helpers-ts
https://www.npmjs.com/package/iroha-helpers-ts


## Configuring the REST Server

## Using the REST Server

To send requests, set the account id, and the private key for the account, in the header of the request:

iroha-account-id: admin@test
iroha-account-key: fbd6b32bacf8ca07ca8e323fc5cd852622750aea0be29bdaddd9c82a00380559

Then send the appropriate request

