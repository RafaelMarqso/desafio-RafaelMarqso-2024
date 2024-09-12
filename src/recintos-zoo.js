class RecintosZoo {
  constructor() {
      this.recintos = [
          { numero: 1, bioma: "savana", tamanho_total: 10, animais: { MACACO: 3 } },
          { numero: 2, bioma: "floresta", tamanho_total: 5, animais: {} },
          { numero: 3, bioma: "savana e rio", tamanho_total: 7, animais: { GAZELA: 1 } },
          { numero: 4, bioma: "rio", tamanho_total: 8, animais: {} },
          { numero: 5, bioma: "savana", tamanho_total: 9, animais: { LEAO: 1 } }
      ];

      this.animaisInfo = {
          LEAO: { tamanho: 3, biomas: ["savana"], carnivoro: true },
          LEOPARDO: { tamanho: 2, biomas: ["savana"], carnivoro: true },
          CROCODILO: { tamanho: 3, biomas: ["rio"], carnivoro: true },
          MACACO: { tamanho: 1, biomas: ["savana", "floresta"], carnivoro: false },
          GAZELA: { tamanho: 2, biomas: ["savana"], carnivoro: false },
          HIPOPOTAMO: { tamanho: 4, biomas: ["savana", "rio"], carnivoro: false }
      };
  }

  analisaRecintos(animal, quantidade) {
      // Verificar se o animal informado é válido
      if (!this.animaisInfo[animal]) {
          return { erro: "Animal inválido", recintosViaveis: null };
      }

      // Verificar se a quantidade é válida
      if (quantidade <= 0) {
          return { erro: "Quantidade inválida", recintosViaveis: null };
      }

      const animalInfo = this.animaisInfo[animal];
      const tamanhoTotalAnimal = animalInfo.tamanho * quantidade;
      let recintosViaveis = [];

      // Iterar sobre cada recinto
      this.recintos.forEach(recinto => {
          const biomasRecinto = recinto.bioma.split(" e ");
          const espacoOcupado = Object.entries(recinto.animais).reduce(
              (total, [animalExistente, qtd]) => total + this.animaisInfo[animalExistente].tamanho * qtd,
              0
          );

          if (!biomasRecinto.some(bioma => animalInfo.biomas.includes(bioma))) {
              return;
          }

    
          if (animalInfo.carnivoro && Object.keys(recinto.animais).some(a => this.animaisInfo[a].carnivoro && a !== animal)) {
              return;
          }

          const espacoLivre = recinto.tamanho_total - espacoOcupado;
          console.log(`Recinto ${recinto.numero} - Espaço livre antes dos novos animais: ${espacoLivre}`);

   
          const espacoExtra = Object.keys(recinto.animais).length > 0 ? 1 : 0;
          const espacoNecessario = tamanhoTotalAnimal + espacoExtra;

          console.log(`Animal: ${animal}, Quantidade: ${quantidade}, Espaço necessário: ${espacoNecessario}`);

       
          if (espacoLivre >= espacoNecessario) {
           
              const espacoLivreRestante = espacoLivre - tamanhoTotalAnimal;
              
              console.log(`Recinto ${recinto.numero} - Espaço livre restante após adicionar ${quantidade} ${animal}(s): ${espacoLivreRestante}`);
              
              recintosViaveis.push({
                  numero: recinto.numero,
                  espacoLivre: espacoLivreRestante, 
                  espacoTotal: recinto.tamanho_total,
                  bioma: recinto.bioma
              });
          }
      });

      if (animal === "CROCODILO") {
          recintosViaveis = recintosViaveis.filter(recinto => recinto.bioma === "rio");
      }
      recintosViaveis = recintosViaveis.map(recinto => 
          `Recinto ${recinto.numero} (espaço livre: ${recinto.espacoLivre} total: ${recinto.espacoTotal})`
      );

      if (recintosViaveis.length > 0) {
          return { recintosViaveis };
      } else {
          return { erro: "Não há recinto viável", recintosViaveis: null };
      }
  }
}


export { RecintosZoo as RecintosZoo };
