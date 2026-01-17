"use client"

import type React from "react"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui-shadcn/dialog"
import { Badge } from "@/components/ui-shadcn/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui-shadcn/tabs"
import { ScrollArea } from "@/components/ui-shadcn/scroll-area"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui-shadcn/card"
import { User, Phone, Mail, MapPin, Calendar, Building2, Heart, FileText, Users, Stethoscope } from "lucide-react"
import type { PacienteResponse } from "@/models/paciente.types"

interface PacienteDetailsModalProps {
    open: boolean
    onOpenChange: (open: boolean) => void
    paciente: PacienteResponse | null
}

export function PacienteDetailsModal({ open, onOpenChange, paciente }: PacienteDetailsModalProps) {
    if (!paciente) return null

    const formatDate = (dateStr: string) => {
        return new Date(dateStr).toLocaleDateString("pt-BR")
    }

    const InfoItem = ({
                          icon: Icon,
                          label,
                          value,
                      }: {
        icon: React.ElementType
        label: string
        value?: string | null
    }) => (
        <div className="flex items-start gap-2">
            <Icon className="h-4 w-4 text-muted-foreground mt-0.5" />
            <div>
                <p className="text-xs text-muted-foreground">{label}</p>
                <p className="text-sm font-medium">{value || "-"}</p>
            </div>
        </div>
    )

    const BooleanBadge = ({ value, label }: { value?: boolean; label: string }) => (
        <Badge
            variant={value ? "default" : "secondary"}
            className={value ? "bg-amber-100 text-amber-700 hover:bg-amber-100" : "bg-slate-100 text-slate-500"}
        >
            {label}: {value ? "Sim" : "Não"}
        </Badge>
    )

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-4xl max-h-[90vh]">
                <DialogHeader>
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-sky-100">
                                <User className="h-6 w-6 text-sky-600" />
                            </div>
                            <div>
                                <DialogTitle className="text-xl">{paciente.dadosBasicos.nome}</DialogTitle>
                                <p className="text-sm text-muted-foreground">Prontuário: {paciente.dadosBasicos.prontuarioNumero}</p>
                            </div>
                        </div>
                        <Badge
                            variant={paciente.ativo ? "default" : "secondary"}
                            className={paciente.ativo ? "bg-emerald-100 text-emerald-700" : "bg-slate-100 text-slate-600"}
                        >
                            {paciente.ativo ? "Ativo" : "Inativo"}
                        </Badge>
                    </div>
                </DialogHeader>

                <Tabs defaultValue="dados" className="w-full">
                    <TabsList className="grid w-full grid-cols-5">
                        <TabsTrigger value="dados" className="text-xs">
                            <User className="mr-1 h-3 w-3" />
                            Dados
                        </TabsTrigger>
                        <TabsTrigger value="responsavel" className="text-xs">
                            <Users className="mr-1 h-3 w-3" />
                            Responsável
                        </TabsTrigger>
                        <TabsTrigger value="saude" className="text-xs">
                            <Heart className="mr-1 h-3 w-3" />
                            Saúde
                        </TabsTrigger>
                        <TabsTrigger value="bucal" className="text-xs">
                            <Stethoscope className="mr-1 h-3 w-3" />
                            Inspeção Bucal
                        </TabsTrigger>
                        <TabsTrigger value="convenio" className="text-xs">
                            <Building2 className="mr-1 h-3 w-3" />
                            Convênio
                        </TabsTrigger>
                    </TabsList>

                    <ScrollArea className="h-[50vh] mt-4">
                        <TabsContent value="dados" className="space-y-4">
                            <Card>
                                <CardHeader className="pb-3">
                                    <CardTitle className="text-sm">Informações Pessoais</CardTitle>
                                </CardHeader>
                                <CardContent className="grid grid-cols-2 gap-4 md:grid-cols-3">
                                    <InfoItem icon={User} label="Nome Completo" value={paciente.dadosBasicos.nome} />
                                    <InfoItem icon={FileText} label="CPF" value={paciente.dadosBasicos.cpf} />
                                    <InfoItem
                                        icon={FileText}
                                        label="RG"
                                        value={
                                            paciente.dadosBasicos.rg
                                                ? `${paciente.dadosBasicos.rg} - ${paciente.dadosBasicos.orgaoExpedidor || ""}`
                                                : undefined
                                        }
                                    />
                                    <InfoItem
                                        icon={Calendar}
                                        label="Data de Nascimento"
                                        value={formatDate(paciente.dadosBasicos.dataNascimento)}
                                    />
                                    <InfoItem icon={User} label="Idade" value={paciente.idade ? `${paciente.idade} anos` : undefined} />
                                    <InfoItem icon={User} label="Profissão" value={paciente.dadosBasicos.profissao} />
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader className="pb-3">
                                    <CardTitle className="text-sm">Contato</CardTitle>
                                </CardHeader>
                                <CardContent className="grid grid-cols-2 gap-4">
                                    <InfoItem icon={Phone} label="Telefone" value={paciente.dadosBasicos.telefone} />
                                    <InfoItem icon={Mail} label="E-mail" value={paciente.dadosBasicos.email} />
                                    <InfoItem icon={MapPin} label="Endereço" value={paciente.dadosBasicos.enderecoResidencial} />
                                    <InfoItem icon={MapPin} label="Naturalidade" value={paciente.dadosBasicos.naturalidade} />
                                </CardContent>
                            </Card>

                            {paciente.observacoes && (
                                <Card>
                                    <CardHeader className="pb-3">
                                        <CardTitle className="text-sm">Observações</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <p className="text-sm">{paciente.observacoes}</p>
                                    </CardContent>
                                </Card>
                            )}
                        </TabsContent>

                        <TabsContent value="responsavel" className="space-y-4">
                            {paciente.responsavel?.nome ? (
                                <Card>
                                    <CardHeader className="pb-3">
                                        <CardTitle className="text-sm">Dados do Responsável</CardTitle>
                                    </CardHeader>
                                    <CardContent className="grid grid-cols-2 gap-4">
                                        <InfoItem icon={User} label="Nome" value={paciente.responsavel.nome} />
                                        <InfoItem
                                            icon={FileText}
                                            label="CPF"
                                            value={paciente.responsavel.cpfFormatado || paciente.responsavel.cpf}
                                        />
                                        <InfoItem
                                            icon={FileText}
                                            label="RG"
                                            value={
                                                paciente.responsavel.rg
                                                    ? `${paciente.responsavel.rg} - ${paciente.responsavel.orgaoExpedidor || ""}`
                                                    : undefined
                                            }
                                        />
                                        <InfoItem icon={User} label="Estado Civil" value={paciente.responsavel.estadoCivil} />
                                    </CardContent>
                                </Card>
                            ) : (
                                <Card>
                                    <CardContent className="py-8 text-center text-muted-foreground">
                                        Nenhum responsável cadastrado
                                    </CardContent>
                                </Card>
                            )}

                            {paciente.responsavel?.conjuge && (
                                <Card>
                                    <CardHeader className="pb-3">
                                        <CardTitle className="text-sm">Dados do Cônjuge</CardTitle>
                                    </CardHeader>
                                    <CardContent className="grid grid-cols-2 gap-4">
                                        <InfoItem icon={User} label="Nome" value={paciente.responsavel.conjuge} />
                                        <InfoItem
                                            icon={FileText}
                                            label="CPF"
                                            value={paciente.responsavel.cpfConjugeFormatado || paciente.responsavel.cpfConjuge}
                                        />
                                        <InfoItem
                                            icon={FileText}
                                            label="RG"
                                            value={
                                                paciente.responsavel.rgConjuge
                                                    ? `${paciente.responsavel.rgConjuge} - ${paciente.responsavel.orgaoExpedidorConjuge || ""}`
                                                    : undefined
                                            }
                                        />
                                    </CardContent>
                                </Card>
                            )}
                        </TabsContent>

                        <TabsContent value="saude" className="space-y-4">
                            <Card>
                                <CardHeader className="pb-3">
                                    <CardTitle className="text-sm">Anamnese - Condições de Saúde</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="flex flex-wrap gap-2">
                                        <BooleanBadge value={paciente.anamnese?.febreReumatica} label="Febre Reumática" />
                                        <BooleanBadge value={paciente.anamnese?.hepatite} label="Hepatite" />
                                        <BooleanBadge value={paciente.anamnese?.diabetes} label="Diabetes" />
                                        <BooleanBadge value={paciente.anamnese?.hipertensaoArterialSistemica} label="Hipertensão" />
                                        <BooleanBadge value={paciente.anamnese?.portadorHiv} label="Portador HIV" />
                                        <BooleanBadge value={paciente.anamnese?.problemasCardiacos} label="Problemas Cardíacos" />
                                        <BooleanBadge value={paciente.anamnese?.problemasRenais} label="Problemas Renais" />
                                        <BooleanBadge value={paciente.anamnese?.problemasRespiratorios} label="Problemas Respiratórios" />
                                        <BooleanBadge value={paciente.anamnese?.fumante} label="Fumante" />
                                        <BooleanBadge value={paciente.anamnese?.bebidasAlcoolicas} label="Bebidas Alcoólicas" />
                                    </div>

                                    {paciente.anamnese?.fumante && (
                                        <div className="mt-4 p-3 rounded-lg bg-muted">
                                            <p className="text-sm">
                                                <strong>Quantidade:</strong> {paciente.anamnese.fumanteQuantidade || "-"} cigarros/dia
                                            </p>
                                            <p className="text-sm">
                                                <strong>Tempo de fumo:</strong> {paciente.anamnese.tempoFumo || "-"}
                                            </p>
                                        </div>
                                    )}
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader className="pb-3">
                                    <CardTitle className="text-sm">Questionário de Saúde</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="flex flex-wrap gap-2">
                                        <BooleanBadge value={paciente.questionarioSaude?.sofreDoenca} label="Sofre Doença" />
                                        <BooleanBadge value={paciente.questionarioSaude?.tratamentoMedicoAtual} label="Em Tratamento" />
                                        <BooleanBadge value={paciente.questionarioSaude?.gravidez} label="Gravidez" />
                                        <BooleanBadge value={paciente.questionarioSaude?.usoMedicacao} label="Usa Medicação" />
                                        <BooleanBadge value={paciente.questionarioSaude?.teveAlergia} label="Tem Alergia" />
                                        <BooleanBadge value={paciente.questionarioSaude?.foiOperado} label="Foi Operado" />
                                        <BooleanBadge
                                            value={paciente.questionarioSaude?.problemasHemorragia}
                                            label="Problemas Hemorragia"
                                        />
                                    </div>

                                    {paciente.questionarioSaude?.usoMedicacaoQuais && (
                                        <div className="mt-4 p-3 rounded-lg bg-muted">
                                            <p className="text-sm font-medium">Medicações em uso:</p>
                                            <p className="text-sm">{paciente.questionarioSaude.usoMedicacaoQuais}</p>
                                        </div>
                                    )}

                                    {paciente.questionarioSaude?.teveAlergiaQuais && (
                                        <div className="mt-2 p-3 rounded-lg bg-muted">
                                            <p className="text-sm font-medium">Alergias:</p>
                                            <p className="text-sm">{paciente.questionarioSaude.teveAlergiaQuais}</p>
                                        </div>
                                    )}
                                </CardContent>
                            </Card>

                            {(paciente.anamnese?.queixaPrincipal || paciente.anamnese?.evolucaoDoencaAtual) && (
                                <Card>
                                    <CardHeader className="pb-3">
                                        <CardTitle className="text-sm">Queixa e Evolução</CardTitle>
                                    </CardHeader>
                                    <CardContent className="space-y-3">
                                        {paciente.anamnese?.queixaPrincipal && (
                                            <div>
                                                <p className="text-xs text-muted-foreground">Queixa Principal</p>
                                                <p className="text-sm">{paciente.anamnese.queixaPrincipal}</p>
                                            </div>
                                        )}
                                        {paciente.anamnese?.evolucaoDoencaAtual && (
                                            <div>
                                                <p className="text-xs text-muted-foreground">Evolução da Doença Atual</p>
                                                <p className="text-sm">{paciente.anamnese.evolucaoDoencaAtual}</p>
                                            </div>
                                        )}
                                    </CardContent>
                                </Card>
                            )}
                        </TabsContent>

                        <TabsContent value="bucal" className="space-y-4">
                            <Card>
                                <CardHeader className="pb-3">
                                    <CardTitle className="text-sm">Exame da Cavidade Bucal</CardTitle>
                                </CardHeader>
                                <CardContent className="grid grid-cols-2 gap-4 md:grid-cols-3">
                                    <InfoItem icon={Stethoscope} label="Língua" value={paciente.inspecaoBucal?.lingua} />
                                    <InfoItem icon={Stethoscope} label="Mucosa" value={paciente.inspecaoBucal?.mucosa} />
                                    <InfoItem icon={Stethoscope} label="Palato" value={paciente.inspecaoBucal?.palato} />
                                    <InfoItem icon={Stethoscope} label="Lábios" value={paciente.inspecaoBucal?.labios} />
                                    <InfoItem icon={Stethoscope} label="Gengivas" value={paciente.inspecaoBucal?.gengivas} />
                                    <InfoItem icon={Stethoscope} label="Face" value={paciente.inspecaoBucal?.face} />
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader className="pb-3">
                                    <CardTitle className="text-sm">Outras Estruturas</CardTitle>
                                </CardHeader>
                                <CardContent className="grid grid-cols-2 gap-4">
                                    <InfoItem icon={Stethoscope} label="Nariz" value={paciente.inspecaoBucal?.nariz} />
                                    <InfoItem icon={Stethoscope} label="Gânglios" value={paciente.inspecaoBucal?.ganglios} />
                                    <InfoItem
                                        icon={Stethoscope}
                                        label="Glândulas Salivares"
                                        value={paciente.inspecaoBucal?.glandulasSalivares}
                                    />
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader className="pb-3">
                                    <CardTitle className="text-sm">Oclusão e Prótese</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-3">
                                    <div className="flex gap-2">
                                        <BooleanBadge value={paciente.inspecaoBucal?.alteracaoOclusao} label="Alteração de Oclusão" />
                                        <BooleanBadge value={paciente.inspecaoBucal?.protese} label="Usa Prótese" />
                                    </div>
                                    {paciente.inspecaoBucal?.alteracaoOclusaoTipo && (
                                        <p className="text-sm">
                                            <strong>Tipo de alteração:</strong> {paciente.inspecaoBucal.alteracaoOclusaoTipo}
                                        </p>
                                    )}
                                    {paciente.inspecaoBucal?.proteseTipo && (
                                        <p className="text-sm">
                                            <strong>Tipo de prótese:</strong> {paciente.inspecaoBucal.proteseTipo}
                                        </p>
                                    )}
                                    {paciente.inspecaoBucal?.outrasObservacoes && (
                                        <div className="p-3 rounded-lg bg-muted">
                                            <p className="text-xs text-muted-foreground">Observações</p>
                                            <p className="text-sm">{paciente.inspecaoBucal.outrasObservacoes}</p>
                                        </div>
                                    )}
                                </CardContent>
                            </Card>
                        </TabsContent>

                        <TabsContent value="convenio" className="space-y-4">
                            {paciente.convenio?.nomeConvenio ? (
                                <Card>
                                    <CardHeader className="pb-3">
                                        <CardTitle className="text-sm">Dados do Convênio</CardTitle>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                        <InfoItem icon={Building2} label="Convênio" value={paciente.convenio.nomeConvenio} />
                                        <InfoItem icon={FileText} label="Número de Inscrição" value={paciente.convenio.numeroInscricao} />
                                    </CardContent>
                                </Card>
                            ) : (
                                <Card>
                                    <CardContent className="py-8 text-center text-muted-foreground">
                                        <Building2 className="mx-auto h-12 w-12 text-muted-foreground/50 mb-3" />
                                        <p>Paciente Particular</p>
                                        <p className="text-sm">Nenhum convênio cadastrado</p>
                                    </CardContent>
                                </Card>
                            )}
                        </TabsContent>
                    </ScrollArea>
                </Tabs>
            </DialogContent>
        </Dialog>
    )
}
