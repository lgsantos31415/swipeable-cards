# react-native-swipeable-cards-lgsantos31415

**Swipeable Cards (Cards Arrastáveis)**  
Este pacote recria a experiência de arrastar cards no estilo Tinder, utilizando as bibliotecas [`react-native-reanimated`](https://docs.swmansion.com/react-native-reanimated/) e [`react-native-gesture-handler`](https://docs.swmansion.com/react-native-gesture-handler/).

---

## 📦 Instalação

```sh
npm install react-native-swipeable-cards-lgsantos31415
```

---

## 🚀 Uso

```tsx
import SwipeableCards from 'react-native-swipeable-cards-lgsantos31415';

const Example = () => {
  return <SwipeableCards data={['Card 1', 'Card 2']} />;
};
```

---

## ⚙️ Propriedades

| Propriedade | Tipo                                     | Descrição                                     | Padrão          |
| ----------- | ---------------------------------------- | --------------------------------------------- | --------------- |
| `data`      | `string[]`                               | Lista de textos que serão exibidos nos cards. | **Obrigatório** |
| `onSwipe`   | `(direction: 'left' \| 'right') => void` | Função callback chamada ao realizar um swipe. | —               |
| `style`     | `ViewStyle`                              | Estilo da `View` que engloba todos os cards.  | `undefined`     |
| `cardSize`  | `{ width: number; height: number }`      | Define o tamanho dos cards individualmente.   | `undefined`     |
| `cardStyle` | `ViewStyle`                              | Estilo aplicado diretamente a cada card.      | `undefined`     |
| `textStyle` | `TextStyle`                              | Estilo do texto dentro de cada card.          | `undefined`     |

---

## 🤝 Contribuindo

Veja o [guia de contribuição](CONTRIBUTING.md) para aprender como contribuir com o projeto e configurar o ambiente de desenvolvimento.

---

## 📄 Licença

Este projeto está licenciado sob a licença [MIT](LICENSE).
