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

    id: Objecto de valor - OK
    description: Objecto de valor - OK
    isPercentual: Objecto de valor - OK
    budgetPercentage: Objecto de valor - OK
    reasons: Entity Objecto de valor - OK
```