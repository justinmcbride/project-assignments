import { RoleCard, ROLE_CARD_MIN_HEIGHT, ROLE_CARD_MIN_WIDTH } from "@/components/RoleCard";
import Role from "@/types/Role";

interface RolesGridProps {
  roles: Role[];
}

export const RolesGrid = ({ roles }: RolesGridProps) => {
  return (
    <section className="flex-1 min-w-0 flex flex-col min-h-0">
      <div
        style={{
          flex: 1,
          display: "grid",
          gridTemplateColumns: `repeat(4, minmax(${ROLE_CARD_MIN_WIDTH}px, 1fr))`,
          gridTemplateRows: `repeat(2, minmax(${ROLE_CARD_MIN_HEIGHT}px, 1fr))`,
          gap: "1rem",
          minHeight: 0,
        }}
      >
        {roles.map((role) => (
          <div
            key={role.name}
            style={{
              minWidth: ROLE_CARD_MIN_WIDTH,
              minHeight: ROLE_CARD_MIN_HEIGHT,
            }}
          >
            <RoleCard role={role} />
          </div>
        ))}
      </div>
    </section>
  );
};
