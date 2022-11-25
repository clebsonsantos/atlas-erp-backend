
<h1 align="center">
ATLAS - ENTERPRISE RESOURCE PLANNING (SERVER)
</h1>
<h1 align="center">
<img src="https://user-images.githubusercontent.com/60331806/160242659-8d126cec-b865-47b3-b3c6-d2797dd6c7a7.svg">
</img>
</h1>

## `Features`

- `C.R.U.D. for options`:
  - Customers
  - Products
  - Expenses
  - Centers Cost
  - Categories
  - Sales
  - Users

- `Associate the permissions below with users`:
  - admin
  - sales
  - expenses
  - products
  - customers
  - center_cost
  - categories
  - reports

## `Relations`

```
  sales
  ^---^
  |   |
  |   +--> products sold
  +--> customer
```

```
  expenses
  ^------^
  |      |
  |      +--> categories
  +--> center cost
```

```
  products
  ^------^
         |
         +--> center cost

```

```
  products sold
  ^-----------^
              |
              +--> products

```

## In Progressing
  
Create Documentation:

- use Swagger
- all routes