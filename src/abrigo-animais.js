class AbrigoAnimais {

  encontraPessoas(brinquedosPessoa1, brinquedosPessoa2, ordemAnimais) {
    const DADOS_DOS_ANIMAIS = {
      Rex: ["cão", "RATO", "BOLA"],
      Mimi: ["gato", "BOLA", "LASER"],
      Fofo: ["gato", "BOLA", "RATO", "LASER"],
      Zero: ["gato", "RATO", "BOLA"],
      Bola: ["cão", "CAIXA", "NOVELO"],
      Bebe: ["cão", "LASER", "RATO", "BOLA"],
      Loco: ["jabuti", "SKATE", "RATO"],
    };
    const LIMITE_DE_ADOCOES_POR_PESSOA = 3;

    // --- Preparação dos Dados de Entrada ---
    const brinquedosDaPessoa1 = brinquedosPessoa1.split(",");
    const brinquedosDaPessoa2 = brinquedosPessoa2.split(",");
    const filaDeAnimaisParaAdocao = ordemAnimais.split(",");

    // --- Validação Inicial ---
    // Verifica se alguma das pessoas listou o mesmo brinquedo duas vezes.
    const temBrinquedosDuplicados =
      new Set(brinquedosDaPessoa1).size !== brinquedosDaPessoa1.length ||
      new Set(brinquedosDaPessoa2).size !== brinquedosDaPessoa2.length;

    if (temBrinquedosDuplicados) {
      return { erro: "Entrada inválida" };
    }

    // --- Processo de Adoção ---
    const resultadoFinal = [];
    let adocoesDaPessoa1 = 0;
    let adocoesDaPessoa2 = 0;

    // Itera sobre cada animal na ordem definida.
    for (const nomeAnimal of filaDeAnimaisParaAdocao) {
      const dadosAnimal = DADOS_DOS_ANIMAIS[nomeAnimal];

      // Valida se o animal realmente existe no abrigo.
      if (!dadosAnimal) {
        return { erro: `Animal inválido` };
      }

      const [tipo, ...brinquedosFavoritos] = dadosAnimal;

      // Verifica a compatibilidade de cada pessoa com o animal atual.
      const pessoa1EhCompativel = this._verificarCompatibilidade(tipo, brinquedosDaPessoa1, brinquedosFavoritos);
      const pessoa2EhCompativel = this._verificarCompatibilidade(tipo, brinquedosDaPessoa2, brinquedosFavoritos);

      let adotanteFinal = "abrigo"; // Por padrão, o animal fica no abrigo.

      // --- Regras de Decisão da Adoção ---
      if (pessoa1EhCompativel && pessoa2EhCompativel) {
        adotanteFinal = "abrigo";
      } else if (pessoa1EhCompativel && adocoesDaPessoa1 < LIMITE_DE_ADOCOES_POR_PESSOA) {
        adotanteFinal = "pessoa 1";
        adocoesDaPessoa1++;
      } else if (pessoa2EhCompativel && adocoesDaPessoa2 < LIMITE_DE_ADOCOES_POR_PESSOA) {
        adotanteFinal = "pessoa 2";
        adocoesDaPessoa2++;
      }

      resultadoFinal.push(`${nomeAnimal} - ${adotanteFinal}`);
    }

    resultadoFinal.sort();
    return { lista: resultadoFinal };
  }

  /**
   Método central que direciona para a regra de compatibilidade correta
   com base no tipo do animal.
   */
  _verificarCompatibilidade(tipoAnimal, brinquedosDaPessoa, brinquedosFavoritosDoAnimal) {
    // Se um animal não tem brinquedos favoritos, ninguém é compatível.
    if (brinquedosFavoritosDoAnimal.length === 0) {
      return false;
    }
    
    switch (tipoAnimal) {
      case "gato":
      case "cão":
        return this._possuiBrinquedosEmOrdem(brinquedosDaPessoa, brinquedosFavoritosDoAnimal);
      case "jabuti":
        return this._possuiAlgumBrinquedoFavorito(brinquedosDaPessoa, brinquedosFavoritosDoAnimal);
      default:
        return false;
    }
  }

  /**
   * Verifica se a pessoa possui os brinquedos favoritos do animal, respeitando a ordem de preferência.
   * Ex: Animal gosta de ["BOLA", "LASER"]. Pessoa com ["BOLA", "RATO", "LASER"] é compatível.
   * Pessoa com ["LASER", "BOLA"] não é.
   */
  _possuiBrinquedosEmOrdem(brinquedosDaPessoa, brinquedosFavoritos) {
    let indiceFavorito = 0;
    for (const brinquedoDaPessoa of brinquedosDaPessoa) {
      if (brinquedoDaPessoa === brinquedosFavoritos[indiceFavorito]) {
        indiceFavorito++;
      }
      if (indiceFavorito === brinquedosFavoritos.length) {
        return true;
      }
    }
    return false;
  }

  _possuiAlgumBrinquedoFavorito(brinquedosDaPessoa, brinquedosFavoritos) {
    return brinquedosDaPessoa.some(brinquedo => brinquedosFavoritos.includes(brinquedo));
  }
}

export { AbrigoAnimais as AbrigoAnimais };