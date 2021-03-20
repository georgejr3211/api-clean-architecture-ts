# Clean Architecture
Projeto desenvolvido para aplicar conceitos aprendidos sobre Clean Architecture

# Layers

## Entities
  > Camada responsável por concentrar os participantes das regras de negócio

## UseCase
  > Camada responsável por realizar a orquestração das entidades na concepção das regras de negócio

## Controllers
  > Camada responsável por realizar a comunicação entre o accesso externo e os casos de uso

## Data
  > Camada de implementação, responsável por adaptar libs, ORM's para serem utilizadas em camadas mais internas

## Infra
  > Camada de configuração e implementação de frameworks e drivers

# Dúvidas
## O que são interface adapters
> São classes que fazem a comunicação das camadas externas com as camadas mais internas da aplicação, ou seja, são mediadores.

Importante: Adaptadores são camadas lógicas e não físicas