# Criação do hook `useTypedQuery` e `useLazyTypedQuery`
* Ele funciona similar aos hooks do Apollo Client `useQuery` e `useLazyQuery`
* O retorno dos hooks são os mesmos
* Esse hook faz a validação das `variables` passadas e da resposta da API, com base em schemas do Zod
* Caso uma validação falhe, o objeto de erro é retornado com a seguinte estrutura:
```tsx
export interface IErrorTypedFetch<TError> {
  error: unknown | z.ZodError<unknown> | ApolloError;
  type: "UNEXPECTED" | "PARSING_VARIABLES" | "PARSING_API_RESPONSE_DATA" | "FETCHING_API_RESPONSE_DATA" | "EXPECT_VARIABLES";
  issue_cause?: Record<string, any> | Array<Record<string, any>>;
}
```

`error`: é onde é guardado o erro lançado.
`type`: union de strings com possíveis erros do hook, fiz assim para que seja fácil fazer o debug de erros e fácil de trabalhar na UI
`issue_cause`: é guardado aqui o objeto que falhou na validação do schema, também para facilitar o debug


### Como usar:
Ao usar o hook `useTypedQuery`, é esperado dois argumentos.
O primeiro argumento `queryProperties` é um objeto contendo:
* O schema da resposta da API
* O schema das variables
* A query do GraphQL

O segundo argumento é `options`, o mesmo do `useQuery` padrão, onde você pode passar variables, skip, onCompleted e outras propriedades.


---


Foi criado um objeto `queriesIndex` onde será armazenado todas as queries e seus schemas, cada propriedade armazena `queryProperties`, exigidas pelo hook `useTypedQuery`:
```tsx
// src/services/apollo/queries/queries.index.ts

export const queriesIndex = {
  GET_ME: {
    schema: GET_ME_queryResponseSchema,
    query: GET_ME,
    variables: null,
  },
  GET_SKILLS: {
    schema: GET_SKILLS_queryResponseSchema,
    query: GET_SKILLS,
    variables: null,
  },
  GET_AVAILABILITIES: {
    schema: GET_AVAILABILITIES_queryResponseSchema,
    query: GET_AVAILABILITIES,
    variables: GET_AVAILABILITIES_variablesSchema,
  },
// ...
```

O padrão que usei para passar o objeto queryProperties quando usar nos componentes, foi o seguinte:
1. Importa o objeto `queriesIndex` de `src/services/apollo/queries/queries.index.ts` e renomeia esse import para `api`.
2. Agora você pode usar `api.{o nome da sua query}`.

### Aqui está um exemplo de como foi usado o hook `useTypedQuery`
```tsx
import { queriesIndex as api } from "services/apollo/queries/queries.index";
import { useRouter } from "next/router";

const MentorProfile: NextPage = () => {
  const router = useRouter();
  const id = router.query.id as string;

  const { data, error } = useTypedQuery(api.GET_AVAILABILITIES, {
    variables: {
      mentorId: id,
    },
    skip: !id,
  });
}
```

Tudo 100% tipado e validado, o que falhar na validação, é lançado no error, e pode ser tratado na UI de forma dinâmica.

# Adição do React Hook Form no formulário de edição de perfil
`src/components/EditProfile/EditProfile.tsx`

* Eu tenho familiaridade lidando com forms usando a lib `react-hook-form`.
* A tipagem do User Session estava entrando em conflito, ao finalizar a edição do perfil, os novos dados do form não batiam com a tipagem do User Session, então pra evitar dores de cabeça, eu decidi refatorar o form usando react hook form  e zod pra eu ter controle do output desse formulário.
* Tive que refatorar alguns elementos para que eles pudessem integrar certinho com o react hook forms.
* O component `MultiSelect` das especializações estava imenso, causando bugs de render, eu refatorei ele para uma versão que pede apenas `options` e uma tuple do state que ele está editando.
`src/components/Select`

# Considerações
* Erros vindos do hook `useTypedQuery` não foram tratados, isso será deixado para outra task.
* No hook `useTypedQuery`, a tipagem da resposta da API e dos variables está sendo inferida porque `queriesIndex` não possui tipagem estática declarada, ou seja a inferência da tipagem é dinâmica. Tentativas de declarar uma tipagem para o objeto `queriesIndex` pode quebrar as tipagens do `data`, `error` e `options.variables` lá na frente.
* Não criei tipagens para as mutations, posso fazer nas próximas tasks.
* Não tipei a parte de signup e signin porque vou fazer isso nas tasks da sprint.
* Existe duas tipagens similares, que são union de strings com os dias da semana, umas possuem a inicial maiúsculas e outras não, isso pode ser redundante, uma task averiguando poderia ser bom.
`src/utils/dashboard-helpers.tsx` (L27)
`src/config/constants.ts` (L23)




---

# useGeoStates
O hook `useGeoStates` foi criado para tratar o array de estados do Brasil.

O primeiro argumento aceita `null` ou um array desse tipo:
```tsx
type ReactSelectInterface = {
  label: string;
  value: string;
}
```

O segundo argumento, ele aceita um objeto opcional para o tratamento desse array.
```tsx
export interface IUseGeoStates {
  sort?: "asceding" | "descending";
  limit?: number;
  // ...
}
```

Caso você queira criar um objeto separado para passar os options, para abstrair e reduzir a verbosidade do código por exemplo, você pode declarar seu objeto essa tipagem `IUseGeoStates` e ele estará tipado adequadamente.

Você pode remover e adicionar quais métodos você deseja usar dentro do corpo do hook no arquivo `useGeoStates/hook.tsx`:
```tsx
useEffect(() => {
  const GeoStates = createGeoStates(statesInitialState);
  GeoStates.order(order); // método de ordenação
  GeoStates.limit(limit); // método de limite de quantos são vistos

  setStates(GeoStates.getStates());
}, [statesInitialState, limit, order]);
```