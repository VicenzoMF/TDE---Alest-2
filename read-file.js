const fs = require("fs");

const nomeArquivo = "casosD/casoD50.txt";
const mapa = [];

fs.readFile(nomeArquivo, "utf8", (err, data) => {
  if (err) {
    console.error(err);
    return;
  }

  const linhas = data.split("\n");

  for (const linha of linhas) {
    mapa.push(linha);
  }
  console.log("inicio: " + acharPontoInicial(mapa));

  const tamanho = descobrirTamanho(mapa);
  console.log(`linhas: ${tamanho[0]} colunas: ${tamanho[1]}`)

  const pontoInicial = acharPontoInicial(mapa);
  handleMapa(mapa, pontoInicial, tamanho[0], tamanho[1])
});

function acharPontoInicial(mapa) {
  for (let i = 0; i < mapa.length; i++) {
    if (mapa[i][0] === "-") {
      return i; 
    }
  }
}

function descobrirTamanho(mapa) {
  return tamanho = mapa[0].split(' ').filter(Boolean);
}

function handleMapa(mapa, pontoInicial, row, cols) {
  function incrementarDirecao() {
    if (direcao === 4) {
      direcao = 1
    } else {
      direcao++
    }
  }

  function decrementarDirecao() {
    if (direcao === 1) {
      direcao = 4
    } else {
      direcao--
    }
  }

  let done = false
  let x = 0
  let y = pontoInicial
  const dinheiro = ["0"]
  let ponteiroDinheiro = 0
  const dinheiroTemp = []
  let direcao = 2
  
  // direções
  // 
  //   1
  // 4   2
  //   3

  while(done !== true) {
    // DIREITA
    if (direcao === 2) {
      console.log(`[${y}:${x}]: ${mapa[y][x]}`)
      if(mapa[y][x+1] === "#") {
        done = true
        continue
      }
      if(mapa[y][x+1] === "-") {
        x++
        continue
      }
      if (!isNaN(mapa[y][x+1]) && mapa[y][x+1] !== " ") {
        dinheiroTemp.push(mapa[y][x+1])
        console.log("Dinheiro temp: " + dinheiroTemp)
        
        if (isNaN(mapa[y][x+2]) || mapa[y][x+1] === " ") {
          console.log("entrou")
          for (let m in dinheiroTemp) {
            dinheiro[ponteiroDinheiro] = dinheiro[ponteiroDinheiro] || "0";
            dinheiro[ponteiroDinheiro] += Number(dinheiroTemp[m]);
          }
          ponteiroDinheiro++
          dinheiroTemp.length = 0
          console.log("Dinheiro: " + dinheiro)
        }
        x++
        continue
      }
      if(mapa[y][x+1] === "|") {
        x++
        continue
      }

      if(mapa[y][x+1] === "\\") {
        x++
        incrementarDirecao()
        console.log(direcao)
      }

      if(mapa[y][x+1] === "/") {
        x++
        decrementarDirecao()
        console.log(direcao)
      }

    }
    // Baixo

    if (direcao === 3) {
      console.log(`[${y}:${x}]: ${mapa[y][x]}`)
      if(mapa[y+1][x] === "|") {
        y++
        continue
      }
      if (!isNaN(mapa[y+1][x]) && mapa[y+1][x] !== " ") {
        dinheiroTemp.push(mapa[y+1][x])
        console.log("Dinheiro temp: " + dinheiroTemp)
        
        if (isNaN(mapa[y+2][x]) || mapa[y+1][x] === " ") {
          console.log("entrou")
          for (let m in dinheiroTemp) {
            dinheiro[ponteiroDinheiro] = dinheiro[ponteiroDinheiro] || "0";
            dinheiro[ponteiroDinheiro] += Number(dinheiroTemp[m]);
          }
          ponteiroDinheiro++
          dinheiroTemp.length = 0
          console.log("Dinheiro: " + dinheiro)
        }
        y++
        continue
      }

      if(mapa[y+1][x] === "-") {
        y++
        continue
      }

      if(mapa[y+1][x] === "/") {
        y++
        incrementarDirecao()
        console.log(direcao)
        continue
      }

      if(mapa[y+1][x] === "\\") {
        y++
        decrementarDirecao()
        console.log(direcao)
        continue
      }
    }

    // Esquerda

    if (direcao === 4) {
      console.log(`[${y}:${x}]: ${mapa[y][x]}`)
      if(mapa[y][x-1] === "-") {
        x--
        continue
      }
      if (!isNaN(mapa[y][x-1]) && mapa[y][x-1] !== " ") {
        dinheiroTemp.push(mapa[y][x-1])
        console.log("Dinheiro temp: " + dinheiroTemp)
        
        if (isNaN(mapa[y][x-2]) || mapa[y][x-1] === " ") {
          console.log("entrou")
          console.log("tamanho: " +dinheiroTemp.length)
          while (dinheiroTemp.length > 0) { 
            dinheiro[ponteiroDinheiro] = dinheiro[ponteiroDinheiro] || "0";
            dinheiro[ponteiroDinheiro] += Number(dinheiroTemp.pop());
          }

          ponteiroDinheiro++
          dinheiroTemp.length = 0
          console.log("Dinheiro: " + dinheiro)
        }
        x--
        continue
      }

      if(mapa[y][x-1] === "|") {
        x--
        continue
      }
      
      if(mapa[y][x-1] === "/") {
        x--
        decrementarDirecao()
        console.log("direção: "+direcao)
        continue
      }

      if(mapa[y][x-1] === "\\") {
        x--
        incrementarDirecao()
        console.log("direção: "+direcao)
        continue
      }
      

    }

    // Cima

    if (direcao === 1) {
      console.log(`[${y}:${x}]: ${mapa[y][x]}`)
      if(mapa[y-1][x] === "|") {
        y--
        continue
      }
      if (!isNaN(mapa[y-1][x]) && mapa[y-1][x] !== " ") {
        dinheiroTemp.push(mapa[y-1][x])
        console.log("Dinheiro temp: " + dinheiroTemp)
        
        if (isNaN(mapa[y-2][x]) || mapa[y-1][x] === " ") {
          // console.log("entrou")
          for (let m in dinheiroTemp) {
            dinheiro[ponteiroDinheiro] = dinheiro[ponteiroDinheiro] || "0";
            dinheiro[ponteiroDinheiro] += Number(dinheiroTemp[m]);
          }
          ponteiroDinheiro++
          dinheiroTemp.length = 0
          console.log("Dinheiro: " + dinheiro)
        }
        y--
        continue
      }

      if(mapa[y-1][x] === "-") {
        y--
        continue
      }

      if(mapa[y-1][x] === "/") {
        console.log(`[${y}:${x}]: ${mapa[y][x]}`)
        y--
        incrementarDirecao()
        console.log(direcao)
        continue
      }

      if(mapa[y-1][x] === "\\") {
        y--
        decrementarDirecao()
        console.log(direcao)
        continue
      }
      continue
    }


    done = true
  }
  
}

