"use client";

import { Card, CardContent, Skeleton } from "@mui/joy";
import { ROLE_CARD_MIN_HEIGHT, ROLE_CARD_MIN_WIDTH } from "./RoleCard";

export const RoleCardSkeleton = () => {
  return (
    <div
      style={{
        height: "100%",
        width: "100%",
        minHeight: ROLE_CARD_MIN_HEIGHT,
        minWidth: ROLE_CARD_MIN_WIDTH,
      }}
    >
      <Card
        variant="outlined"
        sx={{ 
          minWidth: ROLE_CARD_MIN_WIDTH,
          minHeight: ROLE_CARD_MIN_HEIGHT,
          width: "100%",
          height: "100%",
          flexShrink: 0,
          display: "flex",
          flexDirection: "column",
          background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(248, 250, 252, 0.9) 100%)',
          backdropFilter: 'blur(10px)',
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
        }}
      >
        <CardContent sx={{ 
          p: 0.5, 
          flex: 1, 
          display: "flex", 
          flexDirection: "column", 
          minWidth: 0,
        }}>
          {/* Title */}
          <Skeleton variant="text" level="title-lg" width="60%" sx={{ mb: 1 }} />
          
          {/* Description */}
          <Skeleton variant="text" level="body-sm" width="90%" />
          <Skeleton variant="text" level="body-sm" width="75%" sx={{ mb: 2 }} />

          {/* Students section */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem', marginTop: 'auto' }}>
            <Skeleton variant="text" level="body-sm" width="40%" />
            <Skeleton variant="rectangular" height={6} sx={{ borderRadius: '4px', mb: 1 }} />
          </div>

          {/* Student chips */}
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
            <Skeleton variant="rectangular" width={100} height={32} sx={{ borderRadius: '8px' }} />
            <Skeleton variant="rectangular" width={120} height={32} sx={{ borderRadius: '8px' }} />
          </div>

          {/* Mentors section */}
          <Skeleton variant="text" level="body-sm" width="30%" sx={{ mb: 1 }} />
          
          {/* Mentor chips */}
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            <Skeleton variant="rectangular" width={90} height={32} sx={{ borderRadius: '8px' }} />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
