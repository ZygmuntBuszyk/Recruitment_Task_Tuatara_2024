# Recruitment task TUATARA
## TASK 

Napisz zadanie w Node, jako serwis (express, baza danych, środowisko na dokerze), w nawiasach opisałem kroki alternatywne dla tej wersji (ponieważ zadanie bazuje na przygotowaniu przy użyciu node.js + camunda).

----------------------------------

Twoim zadaniem jest zaprojektowanie i zaimplementowanie procesu (lub serwisu), który przy użyciu API pozwoli na przeliczenie raty kredytu na podstawie podanych parametrów.

Proces powinien również sprawdzać, czy oprocentowanie jest większe od wartości referencyjnej stopy. Jeśli tak, proces powinien się zakończyć (zwrócić odpowiedź). W przeciwnym razie, należy przeliczyć wartość raty oraz wartość pozostałą do spłaty kredytu i zapisywać wyniki jako nowy obiekt w bazie.

Kroki do wykonania:

Na wejściu procesu należy udostępnić następujące parametry (lub wejście serwisu)

•        Liczba rat wszystkich
•        Liczba rat pozostałych do spłaty
•        Wysokość raty
•        Wartość finansowania
•        Oprocentowanie

Następnie pobierz wartość referencyjnej stopy procentowej ze źródła: https://static.nbp.pl/dane/stopy/stopy_procentowe.xml. Zapisz tę wartość w instancji procesu wraz z datą pobrania. (Lub w bazie dotyczą tego wywołania)

Sprawdź, czy oprocentowanie jest większe od wartości stopy referencyjnej. Jeśli tak, zakończ proces (zwróć odpowiedź z serwisu).

Jeśli oprocentowanie jest mniejsze lub równe wartości stopy referencyjnej, przelicz:

1.       Wartość kontraktu pozostałej do spłaty, zakładając, że wszystkie raty były płatne w wysokości zdefiniowanej na wejściu.
2.       Nową wartość rat pozostałych do spłaty przy oprocentowaniu równym wartości stopy referencyjnej.
3.       Zapisz przeliczone wartości jako nowy obiekt w bazie procesu ( lub w bazie danych).
4.       Sprawdź, czy wartość raty jest mniejsza od 0 lub ujemna. Jeśli tak, załóż task w procesie, korzystając z task listy. ( w wersji bez Camunda może wysłać maila)

Wymagania techniczne:

Wykorzystaj Node.JS, Express, Baza danych dowolna (relacyjna).

API zabezpiecz metodą oAuth 2.0.


## Description
A RESTful service that calculates loan installments based on NBP reference rates with OAuth2 authentication.

## Features
- Calculate loan installments using NBP reference rates
- OAuth2 authentication via Auth0
- Email notifications for negative installment amounts
- PostgreSQL database storage
- Dockerized environment

## Prerequisites
- Node.js 18+
- PostgreSQL
- Docker and Docker Compose
- Auth0 account

### Install dependencies
```
npm install
```

### Local Development
```
npm run dev
```

### Using Docker
```
docker-compose up --build
```

### Get an access token:
```
curl --request POST \
--url https://your-domain.auth0.com/oauth/token \
--header 'content-type: application/json' \
--data '{
"client_id": "your-client-id",
"client_secret": "your-client-secret",
"audience": "your-api-identifier",
"grant_type": "client_credentials"
}'
```

### Calculate Loan
``` curl -X POST \
'http://localhost:3000/api/loans/calculate' \
-H 'Authorization: Bearer YOUR_ACCESS_TOKEN' \
-H 'Content-Type: application/json' \
-d '{
"totalInstallments": 24,
"remainingInstallments": 18,
"installmentAmount": 1000,
"financingAmount": 20000,
"interestRate": 5.5
}'
```