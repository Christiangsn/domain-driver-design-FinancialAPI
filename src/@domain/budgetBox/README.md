# BudgetBox

```json
{
    "id": "uuid",
    "ownerId": "uuid",
    "description": "valid_description", // Value Object
    "balanceAvaliable": 1000,
    "isPercentual": true,
    "budgetPercentage": 80, // Value Object
    "transactionsIds": ["uuid", "uuid"],
    "reasons": [{ // Entity
        "id": "uuid",
        "description": "valid_description"
    }]

}
```

## Structure

```javascript
    BudgetBox: Aggregate Root

    ownerId: 
    description: Objecto de valor - OK
    balanceAvaliable: 
    isPercentual: Objecto de valor - OK
    transactionsIds: 
    reasons: Entity[]
```