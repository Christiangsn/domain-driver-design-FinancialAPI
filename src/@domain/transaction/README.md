# Transaction Aggregado Raiz

```json
{
    "id": "uuid",
    "totalValue": 100, // Dinamic calculations
    "reason": "uuid",
    "paymentDate": "2021-01-01 10:00:00", // Value Object
    "transactionType": enum["Entrada", "Saida"], // Value Object
    "status": enum["Pendente", "Concluído"], // Value Object
    "note": "valid_description", // Value Object
    "attachment": "url", // Value Object
    "calculations": [
        {
            "budgetBoxId": "uuid",
            "value": 50
        },
        {
            "budgetBoxId": "uuid",
            "value": 50
        }
    ]
}
```

- transactionType: Value Object (enum) - OK
- transactionStatus: Value Object (enum) - OK
- note: Value Object - OK
- Attachment: Value Object - OK
- paymentDate: Value Object - OK
- calculations: Value Object - OK
