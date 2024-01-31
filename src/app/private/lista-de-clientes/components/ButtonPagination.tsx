import { ComponentProps, ReactNode } from "react";
interface ButtonProps extends ComponentProps<'button'> {
  title: any;
  icon?: ReactNode;
  reverse?: boolean;
}

export function ButtonPagination({
  icon,
  title,
  reverse = true,
  ...props
}: ButtonProps) {
  return (
    <button className="flex justify-center max-w-[200px] items-center gap-2 rounded-lg shadow-inner border-[1px] border-zinc-200 p-4 bg-white transition-all hover:bg-zinc-50 w-full"
      {...props}
    >
      {!reverse &&
        <div>
          {icon}
        </div>
      }
      <p>{title}</p>
      {reverse &&
        <div >
          {icon}
        </div>
      }
    </button >
  )
}