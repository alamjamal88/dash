// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import React from 'react';
import Grid from '@mui/material/Grid2';
import PageContainer from 'src/components/container/PageContainer';

import ProfileBanner from 'src/components/apps/userprofile/profile/ProfileBanner';
import IntroCard from 'src/components/apps/userprofile/profile/IntroCard';
import PhotosCard from 'src/components/apps/userprofile/profile/PhotosCard';
import Post from 'src/components/apps/userprofile/profile/Post';

const UserProfile = () => {
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

                {/* intro and Photos Card */}
                <Grid
                    size={{
                        sm: 12,
                        lg: 4,
                        xs: 12
                    }}
                >
                    <Grid container spacing={3}>
                        <Grid
                            size={{
                                sm: 12
                            }}
                        >
                            <IntroCard />
                        </Grid>
                        <Grid
                            size={{
                                sm: 12
                            }}
                        >
                            <PhotosCard />
                        </Grid>
                    </Grid>
                </Grid>
                {/* Posts Card */}
                <Grid
                    size={{
                        sm: 12,
                        lg: 8,
                        xs: 12
                    }}
                >
                    <Post />
                </Grid>
            </Grid>
        </PageContainer>
    );
};

export default UserProfile;
