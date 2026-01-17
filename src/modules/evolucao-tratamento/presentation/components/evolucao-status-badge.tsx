import { Badge } from "@/components/ui-shadcn/badge";
import { cn } from "@/lib/utils";
import { FileText, Clock, CheckCircle2, Flag } from "lucide-react";
import type { TipoEvolucao } from "@/modules/evolucao-tratamento";

interface Props {
  tipo: TipoEvolucao;
  className?: string;
}

const cfg: Record<TipoEvolucao, { label: string; icon: typeof FileText; className: string }> = {
  ANAMNESE:  { label: "Anamnese",  icon: FileText,     className: "bg-blue-100 text-blue-700" },
  EVOLUCAO:  { label: "Evolução",  icon: Clock,        className: "bg-amber-100 text-amber-700" },
  CONCLUSAO: { label: "Conclusão", icon: CheckCircle2, className: "bg-emerald-100 text-emerald-700" },
  RETORNO:   { label: "Retorno",   icon: Flag,         className: "bg-purple-100 text-purple-700" },
};

export function EvolucaoStatusBadge({ tipo, className }: Props) {
  const { icon: Icon, label, className: color } = cfg[tipo];
  return (
      <Badge variant="secondary" className={cn(color, className)}>
        <Icon className="mr-1 h-3 w-3" />
        {label}
      </Badge>
  );
}