# Benchmark de Balanceadores de Carga

Este projeto compara o comportamento do **HAProxy** e do **Nginx** como balanceadores de carga utilizando o **Grafana k6**.

## Estrutura

```text
.
├── haproxy-scenario/
├── nginx-scenario/
└── results/
    ├── haproxy/
    └── nginx/
```

Os resultados dos testes são gravados automaticamente na pasta `results`.

---

## Cenários disponíveis

* `baseline`
* `failure`
* `spike`

---

## Executando os testes

### HAProxy

```bash
cd haproxy-scenario

docker compose up --build
```

Troque, no service do k6 no container do proxy que estiver testando, o valor da variável SCENARIO `baseline` por `failure` ou `spike` para executar os demais cenários.

Ao término do teste:

```bash
docker compose down
```

---

### Nginx

```bash
cd nginx-scenario

SCENARIO=baseline docker compose up --build
```

Ao término do teste:

```bash
docker compose down
```

---

## Resultados

Após cada execução, o k6 gera automaticamente um arquivo JSON em:

```text
results/
├── haproxy/
└── nginx/
```

Os arquivos podem ser utilizados posteriormente para geração de gráficos e comparação de desempenho.
