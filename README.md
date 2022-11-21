# SC

### method.send

address : `0x967FE285D361601FA7b8C6559d6FaC34b189E956`
ABI : `/contracts/abi` 폴더의 `DIDContractABI.json`
Send : `issueVC("did:vone:pubKey", "VCId", "hashed")`
( Send Example : `issueVC("did:vone:01E5B053B7ba8A91Bdb8FedD5814296c41aD522E", "123", "asd3dad")` )

```shell
1_initial_migration.js
======================

   Replacing 'Migrations'
   ----------------------
   > transaction hash:    0xbf0e125d4440ef621e1819097c68b127bdcd74cb9f771b94e17045db993135e9
   > Blocks: 0            Seconds: 0
   > contract address:    0xAE25E9381676CfE4e9482690D8B3D098bed12691
   > block number:        107385491
   > block timestamp:     1668962238
   > account:             0x01E5B053B7ba8A91Bdb8FedD5814296c41aD522E
   > balance:             146.272139875
   > gas used:            151734 (0x250b6)
   > gas price:           50 gwei
   > value sent:          0 ETH
   > total cost:          0.0075867 ETH

   > Saving migration to chain.
   > Saving artifacts
   -------------------------------------
   > Total cost:           0.0075867 ETH


2_deploy_contracts.js
=====================

   Replacing 'EternalStorageProxy'
   -------------------------------
   > transaction hash:    0xe973af122d2887d0fbc153ae0658f33b24f59d4028ec3ed0d4e6078c55cc7b9e
   > Blocks: 0            Seconds: 0
   > contract address:    0x967FE285D361601FA7b8C6559d6FaC34b189E956
   > block number:        107385497
   > block timestamp:     1668962244
   > account:             0x01E5B053B7ba8A91Bdb8FedD5814296c41aD522E
   > balance:             146.249867375
   > gas used:            845238 (0xce5b6)
   > gas price:           50 gwei
   > value sent:          0 ETH
   > total cost:          0.0422619 ETH


   Replacing 'BytesUtils'
   ----------------------
   > transaction hash:    0xa6f2395519c4c0d5f848b56748a298f865269271bbd297d53564c377f6a32cd8
   > Blocks: 0            Seconds: 0
   > contract address:    0x4f6eE937b34039Fa173432cF0Cff364bECE33062
   > block number:        107385499
   > block timestamp:     1668962246
   > account:             0x01E5B053B7ba8A91Bdb8FedD5814296c41aD522E
   > balance:             146.2275144
   > gas used:            894119 (0xda4a7)
   > gas price:           50 gwei
   > value sent:          0 ETH
   > total cost:          0.04470595 ETH


   Linking
   -------
   * Contract: DidUtils <--> Library: BytesUtils (at address: 0x4f6eE937b34039Fa173432cF0Cff364bECE33062)

   Replacing 'DidUtils'
   --------------------
   > transaction hash:    0x3f2031b70ab2a8cf20c741c43211c9133ea982dfca088c972830d3df04e00c60
   > Blocks: 0            Seconds: 0
   > contract address:    0xfE1683Dc46763a37AEF4AD106deb7Fc441fb5579
   > block number:        107385502
   > block timestamp:     1668962249
   > account:             0x01E5B053B7ba8A91Bdb8FedD5814296c41aD522E
   > balance:             146.2125988
   > gas used:            596624 (0x91a90)
   > gas price:           50 gwei
   > value sent:          0 ETH
   > total cost:          0.0298312 ETH


   Replacing 'KeyUtils'
   --------------------
   > transaction hash:    0x60ab48e24a49bae0b6b751e8bef19d8151f84ecb909130b7ae8d07e5fcc3c585
   > Blocks: 0            Seconds: 0
   > contract address:    0xE29c9fe916c8E5F6d21c01cb1024f1505287c21C
   > block number:        107385505
   > block timestamp:     1668962252
   > account:             0x01E5B053B7ba8A91Bdb8FedD5814296c41aD522E
   > balance:             146.20113545
   > gas used:            458534 (0x6ff26)
   > gas price:           50 gwei
   > value sent:          0 ETH
   > total cost:          0.0229267 ETH


   Replacing 'ZeroCopySink'
   ------------------------
   > transaction hash:    0xf7ac569e616cbeb2f9f11cca4908786c53755207c6634af288fb1e141e0e9a0e
   > Blocks: 0            Seconds: 0
   > contract address:    0x4730394834dec78167942498344977624fB0F1a4
   > block number:        107385508
   > block timestamp:     1668962255
   > account:             0x01E5B053B7ba8A91Bdb8FedD5814296c41aD522E
   > balance:             146.1991506
   > gas used:            79394 (0x13622)
   > gas price:           50 gwei
   > value sent:          0 ETH
   > total cost:          0.0039697 ETH


   Replacing 'ZeroCopySource'
   --------------------------
   > transaction hash:    0xe1fdf27261b58f1afd1396e5f313d8aeb6597b01f449eb03849723a4b2350aec
   > Blocks: 0            Seconds: 0
   > contract address:    0x7d64c53654A5f8bdf1c9E92dA5e6C7757ec2D5fd
   > block number:        107385511
   > block timestamp:     1668962258
   > account:             0x01E5B053B7ba8A91Bdb8FedD5814296c41aD522E
   > balance:             146.19716575
   > gas used:            79394 (0x13622)
   > gas price:           50 gwei
   > value sent:          0 ETH
   > total cost:          0.0039697 ETH


   Replacing 'IterableMapping'
   ---------------------------
   > transaction hash:    0x96623418539d74cdfee9c45ffb8b786dcc328cb5d1db7ee99875bacbcb0b7084
   > Blocks: 0            Seconds: 0
   > contract address:    0xEc0468Fbfddd2656fDAF53b0710F6e19e1f3ceb6
   > block number:        107385513
   > block timestamp:     1668962260
   > account:             0x01E5B053B7ba8A91Bdb8FedD5814296c41aD522E
   > balance:             146.1951809
   > gas used:            79394 (0x13622)
   > gas price:           50 gwei
   > value sent:          0 ETH
   > total cost:          0.0039697 ETH


   Linking
   -------
   * Contract: StorageUtils <--> Library: KeyUtils (at address: 0xE29c9fe916c8E5F6d21c01cb1024f1505287c21C)

   Linking
   -------
   * Contract: StorageUtils <--> Library: DidUtils (at address: 0xfE1683Dc46763a37AEF4AD106deb7Fc441fb5579)

   Replacing 'StorageUtils'
   ------------------------
   > transaction hash:    0x140ec572b1a63f26dec45489aa8fb4fd4ca9095f16eb67d7c62f4c84bf0ecf33
   > Blocks: 0            Seconds: 0
   > contract address:    0x3B6e989AA9Bc5588d0258dd6AbC344d94c5DeC0d
   > block number:        107385516
   > block timestamp:     1668962263
   > account:             0x01E5B053B7ba8A91Bdb8FedD5814296c41aD522E
   > balance:             146.103012725
   > gas used:            3686727 (0x384147)
   > gas price:           50 gwei
   > value sent:          0 ETH
   > total cost:          0.18433635 ETH


   Linking
   -------
   * Contract: DIDContract <--> Library: DidUtils (at address: 0xfE1683Dc46763a37AEF4AD106deb7Fc441fb5579)

   Linking
   -------
   * Contract: DIDContract <--> Library: KeyUtils (at address: 0xE29c9fe916c8E5F6d21c01cb1024f1505287c21C)

   Linking
   -------
   * Contract: DIDContract <--> Library: BytesUtils (at address: 0x4f6eE937b34039Fa173432cF0Cff364bECE33062)

   Linking
   -------
   * Contract: DIDContract <--> Library: StorageUtils (at address: 0x3B6e989AA9Bc5588d0258dd6AbC344d94c5DeC0d)

   Replacing 'DIDContract'
   -----------------------
   > transaction hash:    0xdc86f2afc1812070c5769f00d2c47c1ef68089632336410aa588c66c14064fcb
   > Blocks: 0            Seconds: 0
   > contract address:    0x02744147a1F443c54C74d0B4C26B8Af40EDF3d60
   > block number:        107385519
   > block timestamp:     1668962266
   > account:             0x01E5B053B7ba8A91Bdb8FedD5814296c41aD522E
   > balance:             145.9556897
   > gas used:            5892921 (0x59eb39)
   > gas price:           50 gwei
   > value sent:          0 ETH
   > total cost:          0.29464605 ETH

   > Saving migration to chain.
   > Saving artifacts
   -------------------------------------
   > Total cost:          0.63061725 ETH

Summary
=======
> Total deployments:   10
> Final cost:          0.63820395 ETH
```
