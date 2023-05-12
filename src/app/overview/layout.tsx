import { Button } from '@/components/atoms/button'
import {
  Database,
  GitCompare,
  Languages,
  LayoutTemplate,
  PlayCircle,
  Rocket,
  ShieldCheck,
  TextCursorInput,
  Unplug,
  Users,
} from 'lucide-react'

export default function DashboardLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode
}) {
  return (
    <section className="bg-background grid lg:grid-cols-5 h-screen">
      <nav className="p-4 flex flex-col gap-4">
        <h1 className="txt-h3">OOO</h1>

        <div className="flex flex-col gap-1">
          <span className="txt-large">Security</span>
          <Button size="sm" variant="menuItem">
            <Rocket className="mr-2 h-4 w-4" />
            Lanzamientos
          </Button>

          <Button size="sm" variant="menuItem">
            <Users className="mr-2 h-4 w-4" />
            Users
          </Button>
          <Button size="sm" variant="menuItem">
            <Unplug className="mr-2 h-4 w-4" />
            Integrations
          </Button>
          <Button size="sm" variant="menuItem">
            <ShieldCheck className="mr-2 h-4 w-4" />
            Permissions
          </Button>
        </div>

        <div className="flex flex-col gap-1">
          <span className="txt-large">Componentes</span>
          <Button size="sm" variant="menuItem">
            <Database className="mr-2 h-4 w-4" />
            Entidades
          </Button>
          <Button size="sm" variant="menuItem">
            <TextCursorInput className="mr-2 h-4 w-4" />
            Formularios
          </Button>
          <Button size="sm" variant="menuItem">
            <GitCompare className="mr-2 h-4 w-4" />
            Relaciones
          </Button>
          <Button size="sm" variant="menuItem">
            <PlayCircle className="mr-2 h-4 w-4" />
            Acciones
          </Button>
          <Button size="sm" variant="menuItem">
            <LayoutTemplate className="mr-2 h-4 w-4" />
            Pantallas
          </Button>
          <Button size="sm" variant="menuItem">
            <Languages className="mr-2 h-4 w-4" />
            Lenguajes
          </Button>
        </div>
      </nav>
      <main className="col-span-3 lg:col-span-4 lg:border-l">{children}</main>
    </section>
  )
}
