"use client"

import type React from "react"

import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui-shadcn/dialog"
import { Button } from "@/components/ui-shadcn/button"
import { Input } from "@/components/ui-shadcn/input"
import { Label } from "@/components/ui-shadcn/label"
import { Textarea } from "@/components/ui-shadcn/textarea"
import { Switch } from "@/components/ui-shadcn/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui-shadcn/tabs"
import { ScrollArea } from "@/components/ui-shadcn/scroll-area"
import type { PacienteRequest, PacienteResponse } from "@/models/paciente.types"

interface PacienteFormModalProps {
    open: boolean
    onOpenChange: (open: boolean) => void
    paciente?: PacienteResponse | null
    onSave: (data: PacienteRequest) => void
}

export function PacienteFormModal({ open, onOpenChange, paciente, onSave }: PacienteFormModalProps) {
    const isEditing = !!paciente

    const [formData, setFormData] = useState<PacienteRequest>({
        dadosBasicos: {
            prontuarioNumero: paciente?.dadosBasicos.prontuarioNumero || "",
            nome: paciente?.dadosBasicos.nome || "",
            email: paciente?.dadosBasicos.email || "",
            telefone: paciente?.dadosBasicos.telefone || "",
            rg: paciente?.dadosBasicos.rg || "",
            orgaoExpedidor: paciente?.dadosBasicos.orgaoExpedidor || "",
            cpf: paciente?.dadosBasicos.cpf || "",
            dataNascimento: paciente?.dadosBasicos.dataNascimento || "",
            naturalidade: paciente?.dadosBasicos.naturalidade || "",
            nacionalidade: paciente?.dadosBasicos.nacionalidade || "",
            profissao: paciente?.dadosBasicos.profissao || "",
            enderecoResidencial: paciente?.dadosBasicos.enderecoResidencial || "",
            indicadoPor: paciente?.dadosBasicos.indicadoPor || "",
            status: paciente?.dadosBasicos.status ?? true,
        },
        responsavel: paciente?.responsavel || {},
        anamnese: paciente?.anamnese || {},
        convenio: paciente?.convenio || {},
        inspecaoBucal: paciente?.inspecaoBucal || {},
        questionarioSaude: paciente?.questionarioSaude || {},
        observacoes: paciente?.observacoes || "",
    })

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        onSave(formData)
    }

    const updateDadosBasicos = (field: string, value: string | boolean) => {
        setFormData((prev) => ({
            ...prev,
            dadosBasicos: { ...prev.dadosBasicos, [field]: value },
        }))
    }

    const updateResponsavel = (field: string, value: string) => {
        setFormData((prev) => ({
            ...prev,
            responsavel: { ...prev.responsavel, [field]: value },
        }))
    }

    const updateAnamnese = (field: string, value: string | boolean) => {
        setFormData((prev) => ({
            ...prev,
            anamnese: { ...prev.anamnese, [field]: value },
        }))
    }

    const updateConvenio = (field: string, value: string) => {
        setFormData((prev) => ({
            ...prev,
            convenio: { ...prev.convenio, [field]: value },
        }))
    }

    const updateInspecaoBucal = (field: string, value: string | boolean) => {
        setFormData((prev) => ({
            ...prev,
            inspecaoBucal: { ...prev.inspecaoBucal, [field]: value },
        }))
    }

    const updateQuestionarioSaude = (field: string, value: string | boolean) => {
        setFormData((prev) => ({
            ...prev,
            questionarioSaude: { ...prev.questionarioSaude, [field]: value },
        }))
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-4xl max-h-[90vh]">
                <DialogHeader>
                    <DialogTitle>{isEditing ? "Editar Paciente" : "Novo Paciente"}</DialogTitle>
                    <DialogDescription>
                        {isEditing ? "Atualize os dados do paciente" : "Preencha os dados do novo paciente"}
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit}>
                    <Tabs defaultValue="dados-basicos" className="w-full">
                        <TabsList className="grid w-full grid-cols-6">
                            <TabsTrigger value="dados-basicos" className="text-xs">
                                Dados Básicos
                            </TabsTrigger>
                            <TabsTrigger value="responsavel" className="text-xs">
                                Responsável
                            </TabsTrigger>
                            <TabsTrigger value="anamnese" className="text-xs">
                                Anamnese
                            </TabsTrigger>
                            <TabsTrigger value="convenio" className="text-xs">
                                Convênio
                            </TabsTrigger>
                            <TabsTrigger value="inspecao" className="text-xs">
                                Inspeção Bucal
                            </TabsTrigger>
                            <TabsTrigger value="questionario" className="text-xs">
                                Questionário
                            </TabsTrigger>
                        </TabsList>

                        <ScrollArea className="h-[50vh] mt-4 pr-4">
                            <TabsContent value="dados-basicos" className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label>Número do Prontuário *</Label>
                                        <Input
                                            value={formData.dadosBasicos.prontuarioNumero}
                                            onChange={(e) => updateDadosBasicos("prontuarioNumero", e.target.value)}
                                            required
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Nome Completo *</Label>
                                        <Input
                                            value={formData.dadosBasicos.nome}
                                            onChange={(e) => updateDadosBasicos("nome", e.target.value)}
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label>E-mail</Label>
                                        <Input
                                            type="email"
                                            value={formData.dadosBasicos.email || ""}
                                            onChange={(e) => updateDadosBasicos("email", e.target.value)}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Telefone</Label>
                                        <Input
                                            value={formData.dadosBasicos.telefone || ""}
                                            onChange={(e) => updateDadosBasicos("telefone", e.target.value)}
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-3 gap-4">
                                    <div className="space-y-2">
                                        <Label>CPF</Label>
                                        <Input
                                            value={formData.dadosBasicos.cpf || ""}
                                            onChange={(e) => updateDadosBasicos("cpf", e.target.value)}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label>RG</Label>
                                        <Input
                                            value={formData.dadosBasicos.rg || ""}
                                            onChange={(e) => updateDadosBasicos("rg", e.target.value)}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Órgão Expedidor</Label>
                                        <Input
                                            value={formData.dadosBasicos.orgaoExpedidor || ""}
                                            onChange={(e) => updateDadosBasicos("orgaoExpedidor", e.target.value)}
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label>Data de Nascimento *</Label>
                                        <Input
                                            type="date"
                                            value={formData.dadosBasicos.dataNascimento}
                                            onChange={(e) => updateDadosBasicos("dataNascimento", e.target.value)}
                                            required
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Profissão</Label>
                                        <Input
                                            value={formData.dadosBasicos.profissao || ""}
                                            onChange={(e) => updateDadosBasicos("profissao", e.target.value)}
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label>Naturalidade</Label>
                                        <Input
                                            value={formData.dadosBasicos.naturalidade || ""}
                                            onChange={(e) => updateDadosBasicos("naturalidade", e.target.value)}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Nacionalidade</Label>
                                        <Input
                                            value={formData.dadosBasicos.nacionalidade || ""}
                                            onChange={(e) => updateDadosBasicos("nacionalidade", e.target.value)}
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label>Endereço Residencial</Label>
                                    <Textarea
                                        value={formData.dadosBasicos.enderecoResidencial || ""}
                                        onChange={(e) => updateDadosBasicos("enderecoResidencial", e.target.value)}
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label>Indicado Por</Label>
                                    <Input
                                        value={formData.dadosBasicos.indicadoPor || ""}
                                        onChange={(e) => updateDadosBasicos("indicadoPor", e.target.value)}
                                    />
                                </div>

                                <div className="flex items-center gap-2">
                                    <Switch
                                        checked={formData.dadosBasicos.status}
                                        onCheckedChange={(checked) => updateDadosBasicos("status", checked)}
                                    />
                                    <Label>Paciente Ativo</Label>
                                </div>
                            </TabsContent>

                            <TabsContent value="responsavel" className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label>Nome do Responsável</Label>
                                        <Input
                                            value={formData.responsavel?.nome || ""}
                                            onChange={(e) => updateResponsavel("nome", e.target.value)}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label>CPF do Responsável</Label>
                                        <Input
                                            value={formData.responsavel?.cpf || ""}
                                            onChange={(e) => updateResponsavel("cpf", e.target.value)}
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label>RG do Responsável</Label>
                                        <Input
                                            value={formData.responsavel?.rg || ""}
                                            onChange={(e) => updateResponsavel("rg", e.target.value)}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Órgão Expedidor</Label>
                                        <Input
                                            value={formData.responsavel?.orgaoExpedidor || ""}
                                            onChange={(e) => updateResponsavel("orgaoExpedidor", e.target.value)}
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label>Estado Civil</Label>
                                    <Input
                                        value={formData.responsavel?.estadoCivil || ""}
                                        onChange={(e) => updateResponsavel("estadoCivil", e.target.value)}
                                    />
                                </div>

                                <div className="border-t pt-4 mt-4">
                                    <h4 className="font-medium mb-4">Dados do Cônjuge</h4>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label>Nome do Cônjuge</Label>
                                            <Input
                                                value={formData.responsavel?.conjuge || ""}
                                                onChange={(e) => updateResponsavel("conjuge", e.target.value)}
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label>CPF do Cônjuge</Label>
                                            <Input
                                                value={formData.responsavel?.cpfConjuge || ""}
                                                onChange={(e) => updateResponsavel("cpfConjuge", e.target.value)}
                                            />
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4 mt-4">
                                        <div className="space-y-2">
                                            <Label>RG do Cônjuge</Label>
                                            <Input
                                                value={formData.responsavel?.rgConjuge || ""}
                                                onChange={(e) => updateResponsavel("rgConjuge", e.target.value)}
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label>Órgão Expedidor</Label>
                                            <Input
                                                value={formData.responsavel?.orgaoExpedidorConjuge || ""}
                                                onChange={(e) => updateResponsavel("orgaoExpedidorConjuge", e.target.value)}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </TabsContent>

                            <TabsContent value="anamnese" className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    {[
                                        { key: "febreReumatica", label: "Febre Reumática" },
                                        { key: "hepatite", label: "Hepatite" },
                                        { key: "diabetes", label: "Diabetes" },
                                        { key: "hipertensaoArterialSistemica", label: "Hipertensão" },
                                        { key: "portadorHiv", label: "Portador HIV" },
                                        { key: "alteracaoCoagulacaoSanguinea", label: "Alteração Coagulação" },
                                        { key: "reacoesAlergicas", label: "Reações Alérgicas" },
                                        { key: "doencasSistemicas", label: "Doenças Sistêmicas" },
                                        { key: "internacaoRecente", label: "Internação Recente" },
                                        { key: "utilizandoMedicacao", label: "Utilizando Medicação" },
                                        { key: "fumante", label: "Fumante" },
                                        { key: "bebidasAlcoolicas", label: "Bebidas Alcoólicas" },
                                        { key: "problemasCardiacos", label: "Problemas Cardíacos" },
                                        { key: "problemasRenais", label: "Problemas Renais" },
                                        { key: "problemasGastricos", label: "Problemas Gástricos" },
                                        { key: "problemasRespiratorios", label: "Problemas Respiratórios" },
                                        { key: "problemasAlergicos", label: "Problemas Alérgicos" },
                                        { key: "problemasArticularesOuReumatismo", label: "Problemas Articulares" },
                                    ].map((item) => (
                                        <div key={item.key} className="flex items-center gap-2">
                                            <Switch
                                                checked={(formData.anamnese?.[item.key as keyof typeof formData.anamnese] as boolean) || false}
                                                onCheckedChange={(checked) => updateAnamnese(item.key, checked)}
                                            />
                                            <Label>{item.label}</Label>
                                        </div>
                                    ))}
                                </div>

                                {formData.anamnese?.fumante && (
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label>Quantidade (cigarros/dia)</Label>
                                            <Input
                                                value={formData.anamnese?.fumanteQuantidade || ""}
                                                onChange={(e) => updateAnamnese("fumanteQuantidade", e.target.value)}
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label>Tempo de Fumo</Label>
                                            <Input
                                                value={formData.anamnese?.tempoFumo || ""}
                                                onChange={(e) => updateAnamnese("tempoFumo", e.target.value)}
                                            />
                                        </div>
                                    </div>
                                )}

                                {formData.anamnese?.problemasAlergicos && (
                                    <div className="space-y-2">
                                        <Label>Quais Problemas Alérgicos?</Label>
                                        <Textarea
                                            value={formData.anamnese?.problemasAlergicosQuais || ""}
                                            onChange={(e) => updateAnamnese("problemasAlergicosQuais", e.target.value)}
                                        />
                                    </div>
                                )}

                                <div className="space-y-2">
                                    <Label>Queixa Principal</Label>
                                    <Textarea
                                        value={formData.anamnese?.queixaPrincipal || ""}
                                        onChange={(e) => updateAnamnese("queixaPrincipal", e.target.value)}
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label>Evolução da Doença Atual</Label>
                                    <Textarea
                                        value={formData.anamnese?.evolucaoDoencaAtual || ""}
                                        onChange={(e) => updateAnamnese("evolucaoDoencaAtual", e.target.value)}
                                    />
                                </div>
                            </TabsContent>

                            <TabsContent value="convenio" className="space-y-4">
                                <div className="space-y-2">
                                    <Label>Nome do Convênio</Label>
                                    <Input
                                        value={formData.convenio?.nomeConvenio || ""}
                                        onChange={(e) => updateConvenio("nomeConvenio", e.target.value)}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label>Número de Inscrição</Label>
                                    <Input
                                        value={formData.convenio?.numeroInscricao || ""}
                                        onChange={(e) => updateConvenio("numeroInscricao", e.target.value)}
                                    />
                                </div>
                            </TabsContent>

                            <TabsContent value="inspecao" className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    {[
                                        { key: "lingua", label: "Língua" },
                                        { key: "mucosa", label: "Mucosa" },
                                        { key: "palato", label: "Palato" },
                                        { key: "labios", label: "Lábios" },
                                        { key: "gengivas", label: "Gengivas" },
                                        { key: "nariz", label: "Nariz" },
                                        { key: "face", label: "Face" },
                                        { key: "ganglios", label: "Gânglios" },
                                        { key: "glandulasSalivares", label: "Glândulas Salivares" },
                                    ].map((item) => (
                                        <div key={item.key} className="space-y-2">
                                            <Label>{item.label}</Label>
                                            <Input
                                                value={
                                                    (formData.inspecaoBucal?.[item.key as keyof typeof formData.inspecaoBucal] as string) || ""
                                                }
                                                onChange={(e) => updateInspecaoBucal(item.key, e.target.value)}
                                            />
                                        </div>
                                    ))}
                                </div>

                                <div className="flex items-center gap-2">
                                    <Switch
                                        checked={formData.inspecaoBucal?.alteracaoOclusao || false}
                                        onCheckedChange={(checked) => updateInspecaoBucal("alteracaoOclusao", checked)}
                                    />
                                    <Label>Alteração de Oclusão</Label>
                                </div>

                                {formData.inspecaoBucal?.alteracaoOclusao && (
                                    <div className="space-y-2">
                                        <Label>Tipo de Alteração</Label>
                                        <Input
                                            value={formData.inspecaoBucal?.alteracaoOclusaoTipo || ""}
                                            onChange={(e) => updateInspecaoBucal("alteracaoOclusaoTipo", e.target.value)}
                                        />
                                    </div>
                                )}

                                <div className="flex items-center gap-2">
                                    <Switch
                                        checked={formData.inspecaoBucal?.protese || false}
                                        onCheckedChange={(checked) => updateInspecaoBucal("protese", checked)}
                                    />
                                    <Label>Usa Prótese</Label>
                                </div>

                                {formData.inspecaoBucal?.protese && (
                                    <div className="space-y-2">
                                        <Label>Tipo de Prótese</Label>
                                        <Input
                                            value={formData.inspecaoBucal?.proteseTipo || ""}
                                            onChange={(e) => updateInspecaoBucal("proteseTipo", e.target.value)}
                                        />
                                    </div>
                                )}

                                <div className="space-y-2">
                                    <Label>Outras Observações</Label>
                                    <Textarea
                                        value={formData.inspecaoBucal?.outrasObservacoes || ""}
                                        onChange={(e) => updateInspecaoBucal("outrasObservacoes", e.target.value)}
                                    />
                                </div>
                            </TabsContent>

                            <TabsContent value="questionario" className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    {[
                                        { key: "sofreDoenca", label: "Sofre de alguma doença" },
                                        { key: "tratamentoMedicoAtual", label: "Em tratamento médico" },
                                        { key: "gravidez", label: "Gravidez" },
                                        { key: "usoMedicacao", label: "Usa medicação" },
                                        { key: "teveAlergia", label: "Teve alguma alergia" },
                                        { key: "foiOperado", label: "Foi operado" },
                                        { key: "problemasCicatrizacao", label: "Problemas de cicatrização" },
                                        { key: "problemasAnestesia", label: "Problemas com anestesia" },
                                        { key: "problemasHemorragia", label: "Problemas de hemorragia" },
                                    ].map((item) => (
                                        <div key={item.key} className="flex items-center gap-2">
                                            <Switch
                                                checked={
                                                    (formData.questionarioSaude?.[
                                                        item.key as keyof typeof formData.questionarioSaude
                                                        ] as boolean) || false
                                                }
                                                onCheckedChange={(checked) => updateQuestionarioSaude(item.key, checked)}
                                            />
                                            <Label>{item.label}</Label>
                                        </div>
                                    ))}
                                </div>

                                {formData.questionarioSaude?.sofreDoenca && (
                                    <div className="space-y-2">
                                        <Label>Quais doenças?</Label>
                                        <Textarea
                                            value={formData.questionarioSaude?.sofreDoencaQuais || ""}
                                            onChange={(e) => updateQuestionarioSaude("sofreDoencaQuais", e.target.value)}
                                        />
                                    </div>
                                )}

                                {formData.questionarioSaude?.usoMedicacao && (
                                    <div className="space-y-2">
                                        <Label>Quais medicações?</Label>
                                        <Textarea
                                            value={formData.questionarioSaude?.usoMedicacaoQuais || ""}
                                            onChange={(e) => updateQuestionarioSaude("usoMedicacaoQuais", e.target.value)}
                                        />
                                    </div>
                                )}

                                {formData.questionarioSaude?.teveAlergia && (
                                    <div className="space-y-2">
                                        <Label>Quais alergias?</Label>
                                        <Textarea
                                            value={formData.questionarioSaude?.teveAlergiaQuais || ""}
                                            onChange={(e) => updateQuestionarioSaude("teveAlergiaQuais", e.target.value)}
                                        />
                                    </div>
                                )}

                                {formData.questionarioSaude?.foiOperado && (
                                    <div className="space-y-2">
                                        <Label>Quais cirurgias?</Label>
                                        <Textarea
                                            value={formData.questionarioSaude?.foiOperadoQuais || ""}
                                            onChange={(e) => updateQuestionarioSaude("foiOperadoQuais", e.target.value)}
                                        />
                                    </div>
                                )}

                                <div className="space-y-2">
                                    <Label>Telefone do Médico Assistente</Label>
                                    <Input
                                        value={formData.questionarioSaude?.medicoAssistenteTelefone || ""}
                                        onChange={(e) => updateQuestionarioSaude("medicoAssistenteTelefone", e.target.value)}
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label>Hábitos</Label>
                                    <Textarea
                                        value={formData.questionarioSaude?.habitos || ""}
                                        onChange={(e) => updateQuestionarioSaude("habitos", e.target.value)}
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label>Antecedentes Familiares</Label>
                                    <Textarea
                                        value={formData.questionarioSaude?.antecedentesFamiliares || ""}
                                        onChange={(e) => updateQuestionarioSaude("antecedentesFamiliares", e.target.value)}
                                    />
                                </div>
                            </TabsContent>
                        </ScrollArea>
                    </Tabs>

                    <div className="space-y-2 mt-4">
                        <Label>Observações Gerais</Label>
                        <Textarea
                            value={formData.observacoes || ""}
                            onChange={(e) => setFormData((prev) => ({ ...prev, observacoes: e.target.value }))}
                            placeholder="Observações adicionais sobre o paciente..."
                        />
                    </div>

                    <div className="flex justify-end gap-2 mt-6">
                        <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                            Cancelar
                        </Button>
                        <Button type="submit">{isEditing ? "Salvar Alterações" : "Cadastrar Paciente"}</Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    )
}
