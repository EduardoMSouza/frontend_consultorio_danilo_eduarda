export type TipoEvolucao = "ANAMNESE" | "EVOLUCAO" | "CONCLUSAO" | "RETORNO";

export interface EvolucaoTratamentoRequest {
  pacienteId: number;
  dentistaId: number;
  planoDentalId: number;
  dataEvolucao: string; // yyyy-MM-dd
  tipoEvolucao: TipoEvolucao;
  titulo: string;
  descricao: string;
  procedimentosRealizados?: string;
  materiaisUtilizados?: string;
  medicamentosPrescritos?: string;
  observacoes?: string;
  recomendacoes?: string;
  doresQueixas?: string;
  proximaConsulta?: string;
  tempoConsultaMinutos?: number;
  urgente?: boolean;
  retornoNecessario?: boolean;
  assinaturaDentista?: string;
}

export interface EvolucaoTratamentoResponse {
  id: number;
  planoDentalId: number;
  planoDentalNome?: string;
  pacienteId: number;
  pacienteNome: string;
  dentistaId: number;
  dentistaNome: string;
  dataEvolucao: string;
  tipoEvolucao: TipoEvolucao;
  tipoEvolucaoDescricao?: string;
  titulo: string;
  descricao: string;
  procedimentosRealizados?: string;
  materiaisUtilizados?: string;
  medicamentosPrescritos?: string;
  observacoes?: string;
  recomendacoes?: string;
  doresQueixas?: string;
  proximaConsulta?: string;
  tempoConsultaMinutos?: number;
  urgente: boolean;
  retornoNecessario: boolean;
  assinaturaDentista?: string;
  ativo: boolean;
  criadoEm: string;
  atualizadoEm: string;
}

export interface EvolucaoTratamentoFiltros {
  termo?: string;
  pacienteId?: number;
  dentistaId?: number;
  planoDentalId?: number;
  tipoEvolucao?: TipoEvolucao;
  urgente?: boolean;
  retornoNecessario?: boolean;
  dataInicio?: string;
  dataFim?: string;
  ativo?: boolean;
}

export interface EvolucaoTratamentoStats {
  total: number;
  porTipo: Record<TipoEvolucao, number>;
  urgente: number;
  retornoNecessario: number;
  ativos: number;
  inativos: number;
}

export interface PageResponse<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
}