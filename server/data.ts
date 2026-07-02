const chequeData = [
  {
    "_id": "6a19717d904bd8a49ddb7606",
    "submitted": false,
    "amount": "$1,271.43",
    "agent": "Rosetta Daugherty",
    "customer": "Espinoza Sears",
    "bank": "MEDALERT",
    "issue_date": "2026-03-19",
    "realisation_date": "2027-02-03"
  },
  {
    "_id": "6a19717dee48412a9818336b",
    "submitted": false,
    "amount": "$3,843.38",
    "agent": "Louisa Nieves",
    "customer": "Natalie Moore",
    "bank": "SLOFAST",
    "issue_date": "2026-03-17",
    "realisation_date": "2026-10-25"
  },
  {
    "_id": "6a19717d12ece78937b18ac2",
    "submitted": true,
    "amount": "$3,033.67",
    "agent": "Lauri Anderson",
    "customer": "Reva Acevedo",
    "bank": "LIMAGE",
    "issue_date": "2026-01-30",
    "realisation_date": "2026-06-13"
  },
  {
    "_id": "6a19717d1df3becdfa4a7a74",
    "submitted": false,
    "amount": "$1,106.83",
    "agent": "Allison Dodson",
    "customer": "Jan Johnston",
    "bank": "FISHLAND",
    "issue_date": "2026-03-04",
    "realisation_date": "2026-06-15"
  },
  {
    "_id": "6a19717d426b42470185054e",
    "submitted": true,
    "amount": "$1,547.99",
    "agent": "Lynda Kemp",
    "customer": "Daniel Harris",
    "bank": "EYEWAX",
    "issue_date": "2026-03-27",
    "realisation_date": "2026-10-06"
  },
  {
    "_id": "6a19717d6ab7f96f85e3a6da",
    "submitted": true,
    "amount": "$2,764.48",
    "agent": "Pope Trujillo",
    "customer": "Herrera Phelps",
    "bank": "EVIDENDS",
    "issue_date": "2026-04-14",
    "realisation_date": "2026-08-18"
  },
  {
    "_id": "6a19717da88bfc310ed14a70",
    "submitted": false,
    "amount": "$3,332.53",
    "agent": "Tamara Cross",
    "customer": "Franco Waller",
    "bank": "PLEXIA",
    "issue_date": "2026-02-01",
    "realisation_date": "2026-06-03"
  },
  {
    "_id": "6a19717d33c9233c545723b8",
    "submitted": true,
    "amount": "$3,046.11",
    "agent": "Briana Olsen",
    "customer": "Allyson Singleton",
    "bank": "NETILITY",
    "issue_date": "2026-05-20",
    "realisation_date": "2026-12-18"
  },
  {
    "_id": "6a19717d223c9677cb52fe5d",
    "submitted": true,
    "amount": "$3,658.15",
    "agent": "Eleanor Chan",
    "customer": "Margery Mcdaniel",
    "bank": "TERASCAPE",
    "issue_date": "2026-03-04",
    "realisation_date": "2026-12-23"
  }
]


const custData = [
  {
    "_id": "6a212f3c7a1bed6371952198",
    "name": "Jennie Blake",
    "phone": "(95) 74 603 446",
    "email": "jennieblake@quantasis.com",
    "address": "Walker Court",
    "notes": "Consectetur aliquip officia ut magna nostrud in nulla duis fugiat et cillum sunt adipisicing aliquip.",
    "cheques": [
      "6a212f3c3c80fe3c20e04a8c",
      "6a212f3c82767138db8c9d55",
      "6a212f3cae80d5697466f3bd",
      "6a212f3c6fb62859a150b9fc"
    ]
  },
  {
    "_id": "6a212f3c52d6c379a7cb96fd",
    "name": "Tate Melendez",
    "phone": "(88) 95 712 282",
    "email": "tatemelendez@quantasis.com",
    "address": "Seaview Avenue",
    "notes": "Sit dolore laborum aliqua ex nulla.",
    "cheques": [
      "6a212f3c402b6613f7942c55",
      "6a212f3cca73d9e2fa3e4e6d",
      "6a212f3ca958039a6aa25221"
    ]
  },
  {
    "_id": "6a212f3cdb93f7e3ba605059",
    "name": "Spencer Lamb",
    "phone": "(91) 94 772 414",
    "email": "spencerlamb@quantasis.com",
    "address": "Centre Street",
    "notes": "Eiusmod anim culpa labore in ipsum esse aute quis amet.",
    "cheques": [
      "6a212f3c41570694c61ed9ec",
      "6a212f3c1f8e49b487f652c0",
      "6a212f3c8a3740eda53a508e"
    ]
  },
  {
    "_id": "6a212f3c230fc997005855a7",
    "name": "Chandra Perez",
    "phone": "(93) 15 852 434",
    "email": "chandraperez@quantasis.com",
    "address": "Windsor Place",
    "notes": "Voluptate non qui consectetur ullamco ullamco mollit est.",
    "cheques": [
      "6a212f3c0cb01e8ef48b2036",
      "6a212f3c9c84e1c9d5ad14f1",
      "6a212f3caa0206c6a752c70d"
    ]
  },
  {
    "_id": "6a212f3cbb57486e70a040db",
    "name": "Ilene Lynch",
    "phone": "(81) 24 743 480",
    "email": "ilenelynch@quantasis.com",
    "address": "Cooke Court",
    "notes": "Ipsum sit minim excepteur irure.",
    "cheques": [
      "6a212f3caaf01f35675df02c"
    ]
  },
  {
    "_id": "6a212f3cc697a8b7e074136d",
    "name": "Virginia Dorsey",
    "phone": "(84) 35 523 082",
    "email": "virginiadorsey@quantasis.com",
    "address": "Delmonico Place",
    "notes": "Commodo qui sit culpa sint non Lorem do nisi tempor ad.",
    "cheques": [
      "6a212f3c54ff975d175e747a",
      "6a212f3c03c394ff07018171"
    ]
  },
  {
    "_id": "6a212f3c802499734a34c569",
    "name": "Oneal Bentley",
    "phone": "(82) 04 312 529",
    "email": "onealbentley@quantasis.com",
    "address": "Juliana Place",
    "notes": "Dolore ullamco adipisicing aliquip ad quis adipisicing reprehenderit exercitation pariatur duis reprehenderit aute proident et.",
    "cheques": [
      "6a212f3c5703307d77780d38",
      "6a212f3c7efd754e69723c4e",
      "6a212f3ce5912153082d6cdc",
      "6a212f3cf886612c3c54ed93",
      "6a212f3c20e2a9a450b76cf3"
    ]
  },
  {
    "_id": "6a212f3ce61e9958390bcaea",
    "name": "Conley Meadows",
    "phone": "(94) 65 002 139",
    "email": "conleymeadows@quantasis.com",
    "address": "Beacon Court",
    "notes": "Labore reprehenderit aliquip commodo fugiat ullamco in id adipisicing sit labore.",
    "cheques": [
      "6a212f3c33a51edfdac0f6a0",
      "6a212f3cdc9892b83b69fec9",
      "6a212f3c5cd8af10ab300ecc",
      "6a212f3c2110d0f4b5b5e452"
    ]
  },
  {
    "_id": "6a212f3cf26c7316ad1aa723",
    "name": "Benson Dominguez",
    "phone": "(98) 45 262 436",
    "email": "bensondominguez@quantasis.com",
    "address": "Taylor Street",
    "notes": "Voluptate amet deserunt nisi sunt velit cupidatat eu magna non ex duis.",
    "cheques": [
      "6a212f3c100629838db4d334"
    ]
  }
]

export default { chequeData, custData }