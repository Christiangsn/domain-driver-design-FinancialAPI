Usuário - Agregado Raiz

```json
{
    "id": "uuid",
    "email": "johnjoe@test.com",
    "password": "123456",
    "budgetBoxIds": ["uuid", "uuid"],
    "totalBalanceAvaliable": 10.00,
    "terms": [
        {
            "ip": "120.06.09.011",
            "acceptedAt": "01-01-2021 10:00:00", // ISODATE 8006
            "userAgent": {
                "name": "firefox",
                "version": "86.0.0",
                "os": "Linux",
                "type": "browser"
            },
        },
        {
            "ip": "120.06.09.011",
            "acceptedAt": "01-01-2021 10:00:00", // ISODATE 8006
            "userAgent": {
                "name": "firefox",
                "version": "86.0.0",
                "os": "Linux",
                "type": "browser"
            },
        },
    ]
}
```

## Structure

```javascript
    USER: Aggregate Root 

    id: Objecto de valor - OK
    email: Objecto de valor - OK
    senha: String - Ok
    terms:: ip: objecto de valor - Ok
    terms:: acceptedAt (data): objecto de valor - Ok
```

## User Agent - [Terms]

```json
    "userAgent": {
        "name": "firefox",
        "version": "86.0.0",
        "os": "Linux",
        "type": "browser"
    },
    "totalBalanceAvaliable": 10.00,
    "budgetBoxIds": ["uuid", "uuid"]
```