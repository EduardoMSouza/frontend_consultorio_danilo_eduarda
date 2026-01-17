import type { EvolucaoTratamentoRequest } from "../dto/EvolucaoTratamentoDTOs";

export class EvolucaoTratamentoValidator {
  static validate(
    req: EvolucaoTratamentoRequest
  ): Record<string, string[]> | null {
    const errors: Record<string, string[]> = {};

    if (!req.pacienteId || req.pacienteId <= 0)
      (errors.pacienteId ||= []).push("Paciente é obrigatório");

    if (!req.dentistaId || req.dentistaId <= 0)
      (errors.dentistaId ||= []).push("Dentista é obrigatório");

    if (!req.planoDentalId || req.planoDentalId <= 0)
      (errors.planoDentalId ||= []).push("Plano dental é obrigatório");

    if (!req.dataEvolucao)
      (errors.dataEvolucao ||= []).push("Data da evolução é obrigatória");

    if (!req.tipoEvolucao)
      (errors.tipoEvolucao ||= []).push("Tipo de evolução é obrigatório");

    if (!req.titulo?.trim())
      (errors.titulo ||= []).push("Título é obrigatório");
    else if (req.titulo.length < 3 || req.titulo.length > 200)
      (errors.titulo ||= []).push("Título deve ter entre 3 e 200 caracteres");

    if (!req.descricao?.trim())
      (errors.descricao ||= []).push("Descrição é obrigatória");
    else if (req.descricao.length < 5 || req.descricao.length > 5000)
      (errors.descricao ||= []).push(
        "Descrição deve ter entre 5 e 5000 caracteres"
      );

    if (req.tempoConsultaMinutos != null) {
      if (req.tempoConsultaMinutos < 1 || req.tempoConsultaMinutos > 480)
        (errors.tempoConsultaMinutos ||= []).push(
          "Tempo deve estar entre 1 e 480 minutos"
        );
    }

    if (
      req.procedimentosRealizados &&
      req.procedimentosRealizados.length > 5000
    )
      (errors.procedimentosRealizados ||= []).push("Máximo de 5000 caracteres");

    if (req.materiaisUtilizados && req.materiaisUtilizados.length > 5000)
      (errors.materiaisUtilizados ||= []).push("Máximo de 5000 caracteres");

    if (
      req.medicamentosPrescritos &&
      req.medicamentosPrescritos.length > 5000
    )
      (errors.medicamentosPrescritos ||= []).push("Máximo de 5000 caracteres");

    if (req.observacoes && req.observacoes.length > 5000)
      (errors.observacoes ||= []).push("Máximo de 5000 caracteres");

    if (req.recomendacoes && req.recomendacoes.length > 5000)
      (errors.recomendacoes ||= []).push("Máximo de 5000 caracteres");

    if (req.doresQueixas && req.doresQueixas.length > 2000)
      (errors.doresQueixas ||= []).push("Máximo de 2000 caracteres");

    if (req.assinaturaDentista && req.assinaturaDentista.length > 100)
      (errors.assinaturaDentista ||= []).push("Máximo de 100 caracteres");

    return Object.keys(errors).length ? errors : null;
  }
}