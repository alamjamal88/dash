// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import React from 'react';
import Grid from '@mui/material/Grid2';
import PageContainer from 'src/components/container/PageContainer';
import ProfileBanner from 'src/components/apps/userprofile/profile/ProfileBanner';
import FriendsCard from 'src/components/apps/userprofile/friends/FriendsCard';

const Friends = () => {
    return (
        <PageContainer title="User Profile" description="this is User Profile page">
            <Grid container spacing={3}>
                <Grid
                    size={{
                        sm: 12
                    }}
                >
                    <ProfileBanner />
                </Grid>
                <Grid
                    size={{
                        sm: 12
                    }}
                >
                    <FriendsCard />
                </Grid>
            </Grid>
        </PageContainer>
    );
};

export default Friends;
