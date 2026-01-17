/*******************************************************
 *  TIPOS FRONTEND ↔ BACKEND (Java DTOs)
 *  Espelho fiel dos arquivos:
 *  PacienteRequest / PacienteResponse / PacienteResumoResponse
 ******************************************************/

/* ---------- SUB-TIPOS EMBEBIDOS (REQUEST) ---------- */
export interface DadosBasicosRequest {
    prontuarioNumero: string;
    nome: string;
    email?: string;
    telefone?: string;
    rg?: string;
    orgaoExpedidor?: string;
    cpf?: string;
    dataNascimento: string; // ISO yyyy-MM-dd
    naturalidade?: string;
    nacionalidade?: string;
    profissao?: string;
    enderecoResidencial?: string;
    indicadoPor?: string;
    status: boolean;
}

export interface ResponsavelRequest {
    nome?: string;
    rg?: string;
    orgaoExpedidor?: string;
    cpf?: string;
    estadoCivil?: string;
    conjuge?: string;
    rgConjuge?: string;
    orgaoExpedidorConjuge?: string;
    cpfConjuge?: string;
}

export interface AnamneseRequest {
    febreReumatica?: boolean;
    hepatite?: boolean;
    diabetes?: boolean;
    hipertensaoArterialSistemica?: boolean;
    portadorHiv?: boolean;
    alteracaoCoagulacaoSanguinea?: boolean;
    reacoesAlergicas?: boolean;
    doencasSistemicas?: boolean;
    internacaoRecente?: boolean;
    utilizandoMedicacao?: boolean;
    fumante?: boolean;
    fumanteQuantidade?: string;
    tempoFumo?: string;
    bebidasAlcoolicas?: boolean;
    problemasCardiacos?: boolean;
    problemasRenais?: boolean;
    problemasGastricos?: boolean;
    problemasRespiratorios?: boolean;
    problemasAlergicos?: boolean;
    problemasAlergicosQuais?: string;
    problemasArticularesOuReumatismo?: boolean;
    queixaPrincipal?: string;
    evolucaoDoencaAtual?: string;
}

export interface ConvenioRequest {
    nome?: string; // backend: "nome" (não "nomeConvenio")
    numeroInscricao?: string;
}

export interface InspecaoBucalRequest {
    lingua?: string;
    mucosa?: string;
    palato?: string;
    labios?: string;
    gengivas?: string;
    nariz?: string;
    face?: string;
    ganglios?: string;
    glandulasSalivares?: string;
    alteracaoOclusao?: boolean;
    alteracaoOclusaoTipo?: string;
    protese?: boolean;
    proteseTipo?: string;
    outrasObservacoes?: string;
}

export interface QuestionarioSaudeRequest {
    sofreDoenca?: boolean;
    sofreDoencaQuais?: string;
    tratamentoMedicoAtual?: boolean;
    gravidez?: boolean;
    usoMedicacao?: boolean;
    usoMedicacaoQuais?: string;
    medicoAssistenteTelefone?: string;
    teveAlergia?: boolean;
    teveAlergiaQuais?: string;
    foiOperado?: boolean;
    foiOperadoQuais?: string;
    problemasCicatrizacao?: boolean;
    problemasAnestesia?: boolean;
    problemasHemorragia?: boolean;
    habitos?: string;
    antecedentesFamiliares?: string;
}

/* ---------- REQUEST COMPLETO ---------- */
export interface PacienteRequest {
    dadosBasicos: DadosBasicosRequest;
    responsavel?: ResponsavelRequest;
    anamnese?: AnamneseRequest;
    convenio?: ConvenioRequest;
    inspecaoBucal?: InspecaoBucalRequest;
    questionarioSaude?: QuestionarioSaudeRequest;
    observacoes?: string;
}

/* ---------- SUB-TIPOS EMBEBIDOS (RESPONSE) ---------- */
export interface DadosBasicosResponse {
    prontuarioNumero: string;
    nome: string;
    email?: string;
    telefone?: string;
    rg?: string;
    orgaoExpedidor?: string;
    cpf?: string;
    dataNascimento: string; // ISO
    naturalidade?: string;
    nacionalidade?: string;
    profissao?: string;
    enderecoResidencial?: string;
    indicadoPor?: string;
    status: boolean;
}

export interface ResponsavelResponse {
    nome?: string;
    rg?: string;
    orgaoExpedidor?: string;
    cpf?: string;
    cpfFormatado?: string; // backend devolve
    estadoCivil?: string;
    conjuge?: string;
    rgConjuge?: string;
    orgaoExpedidorConjuge?: string;
    cpfConjuge?: string;
    cpfConjugeFormatado?: string; // backend devolve
}

export interface AnamneseResponse {
    febreReumatica?: boolean;
    hepatite?: boolean;
    diabetes?: boolean;
    hipertensaoArterialSistemica?: boolean;
    portadorHiv?: boolean;
    alteracaoCoagulacaoSanguinea?: boolean;
    reacoesAlergicas?: boolean;
    doencasSistemicas?: boolean;
    internacaoRecente?: boolean;
    utilizandoMedicacao?: boolean;
    fumante?: boolean;
    fumanteQuantidade?: string;
    tempoFumo?: string;
    bebidasAlcoolicas?: boolean;
    problemasCardiacos?: boolean;
    problemasRenais?: boolean;
    problemasGastricos?: boolean;
    problemasRespiratorios?: boolean;
    problemasAlergicos?: boolean;
    problemasAlergicosQuais?: string;
    problemasArticularesOuReumatismo?: boolean;
    queixaPrincipal?: string;
    evolucaoDoencaAtual?: string;
}

export interface ConvenioResponse {
    nome?: string; // backend: "nome"
    numeroInscricao?: string;
}

export interface InspecaoBucalResponse {
    lingua?: string;
    mucosa?: string;
    palato?: string;
    labios?: string;
    gengivas?: string;
    nariz?: string;
    face?: string;
    ganglios?: string;
    glandulasSalivares?: string;
    alteracaoOclusao?: boolean;
    alteracaoOclusaoTipo?: string;
    protese?: boolean;
    proteseTipo?: string;
    outrasObservacoes?: string;
}

export interface QuestionarioSaudeResponse {
    sofreDoenca?: boolean;
    sofreDoencaQuais?: string;
    tratamentoMedicoAtual?: boolean;
    gravidez?: boolean;
    usoMedicacao?: boolean;
    usoMedicacaoQuais?: string;
    medicoAssistenteTelefone?: string;
    teveAlergia?: boolean;
    teveAlergiaQuais?: string;
    foiOperado?: boolean;
    foiOperadoQuais?: string;
    problemasCicatrizacao?: boolean;
    problemasAnestesia?: boolean;
    problemasHemorragia?: boolean;
    habitos?: string;
    antecedentesFamiliares?: string;
}

/* ---------- RESPONSE COMPLETO ---------- */
export interface PacienteResponse {
    id: number;
    dadosBasicos: DadosBasicosResponse;
    responsavel?: ResponsavelResponse;
    anamnese?: AnamneseResponse;
    convenio?: ConvenioResponse;
    inspecaoBucal?: InspecaoBucalResponse;
    questionarioSaude?: QuestionarioSaudeResponse;
    observacoes?: string;
    ativo: boolean;
    idade?: number;
    criadoEm: string; // ISO yyyy-MM-dd HH:mm:ss
    atualizadoEm: string; // ISO yyyy-MM-dd HH:mm:ss
}

/* ---------- RESUMO (tabela / cards) ---------- */
export interface PacienteResumoResponse {
    id: number;
    prontuarioNumero: string;
    nome: string;
    telefone?: string;
    cpf?: string;
    cpfFormatado?: string;
    dataNascimento: string;
    idade?: number;
    convenio?: string; // nome do convênio (opcional)
    numeroInscricaoConvenio?: string;
    status: boolean;
    ativo: boolean;
}

/* ---------- PAGINAÇÃO GENÉRICA ---------- */
export interface PageResponse<T> {
    content: T[];
    totalElements: number;
    totalPages: number;
    size: number;
    number: number;
}

/* ---------- FILTROS FRONT ---------- */
export interface PacienteFiltros {
    nome?: string;
    cpf?: string;
    convenio?: string;
    ativo?: boolean;
    status?: boolean;
}

/* ---------- ESTATÍSTICAS ---------- */
export interface EstatisticasContagem {
    ativos: number;
    inativos: number;
    comConvenio: number;
    semConvenio: number;
    total: number;
}