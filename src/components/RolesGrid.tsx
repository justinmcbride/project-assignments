import { RoleCard, ROLE_CARD_MIN_HEIGHT, ROLE_CARD_MIN_WIDTH } from "@/components/RoleCard";
import Role from "@/types/Role";

interface RolesGridProps {
  roles: Role[];
}

export const RolesGrid = ({ roles }: RolesGridProps) => {
  return (
    <section className="flex-1 min-w-0 flex flex-col">
      <div
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(auto-fit, minmax(${ROLE_CARD_MIN_WIDTH}px, 1fr))`,
          gap: "1rem",
          paddingBottom: "1rem",
          maxWidth: "100%",
          gridAutoFlow: "dense",
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
