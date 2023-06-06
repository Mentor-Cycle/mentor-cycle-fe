type MenuItemProps = {
  title: string;
  onClick?: () => void;
};

const MenuItem: React.FC<MenuItemProps> = ({ title, onClick }) => {
  return (
    <div className="w-full py-4" onClick={onClick}>
      <span className="text-neutral-01 text-2xl hover:text-gray-04 transition">
        {title}
      </span>
    </div>
  );
};

export default MenuItem;
