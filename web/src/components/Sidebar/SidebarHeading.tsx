type SidebarHeadingProps = {
  title: string;
  logo?: React.ReactNode;
};

export const SidebarHeading = ({ title, logo }: SidebarHeadingProps) => {
  return (
    <>
      <div>
        <span className="flex items-center justify-content gap-1">
          {logo}
          <h2 className="text-2xl font-bold">{title}</h2>
        </span>
      </div>
    </>
  );
};
