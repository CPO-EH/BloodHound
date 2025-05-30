// Copyright 2023 Specter Ops, Inc.
//
// Licensed under the Apache License, Version 2.0
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
//
// SPDX-License-Identifier: Apache-2.0

import { Box, CircularProgress } from '@mui/material';
import { LoginForm, LoginViaSSOForm, OneTimePasscodeForm, apiClient } from 'bh-shared-ui';
import React, { useEffect, useState } from 'react';
import { useQuery, useQueryClient } from 'react-query';
import { Navigate } from 'react-router-dom';
import LoginPage from 'src/components/LoginPage';

import { login as loginAction, logout } from 'src/ducks/auth/authSlice';
import { ROUTE_HOME, ROUTE_USER_DISABLED } from 'src/routes/constants';
import { useAppDispatch, useAppSelector } from 'src/store';

const Login: React.FC = () => {
    /* Hooks */
    const dispatch = useAppDispatch();

    const queryClient = useQueryClient();

    const authState = useAppSelector((state) => state.auth);

    const [useSSO, setUseSSO] = useState(false);

    const [lastUsername, setLastUsername] = useState('');

    const [lastPassword, setLastPassword] = useState('');

    // clear the react-query query cache between authenticated sessions
    useEffect(() => {
        queryClient.clear();
    }, [queryClient]);

    const listSSOProvidersQuery = useQuery(['listSSOProviders'], ({ signal }) =>
        apiClient.listSSOProviders({ signal }).then((res) => res.data.data)
    );

    /* Event Handlers */
    const resetForm = () => {
        setUseSSO(false);
        setLastUsername('');
        setLastPassword('');
        dispatch(logout());
    };

    const handleSubmitLoginForm = async (username: string, password: string) => {
        setLastUsername(username);
        setLastPassword(password);
        dispatch(loginAction({ username, password }));
    };

    const handleSubmitLoginWithOneTimePasscodeForm = async (otp: string) => {
        dispatch(loginAction({ username: lastUsername, password: lastPassword, otp }));
    };

    const handleSubmitLoginViaSSOForm = (providerSlug: string) => {
        window.location.assign(`/api/v2/sso/${providerSlug}/login`);
    };

    /* Implementation */

    // Redirect if already logged in
    if (authState.sessionToken !== null && authState.user !== null) return <Navigate to={ROUTE_HOME} replace />;

    if (listSSOProvidersQuery.isLoading) {
        return (
            <LoginPage>
                <Box textAlign='center'>
                    <CircularProgress />
                </Box>
            </LoginPage>
        );
    }

    const userIsDisabled = authState.loginError?.response?.status === 403 || false;
    if (userIsDisabled) {
        return <Navigate to={ROUTE_USER_DISABLED} />;
    }

    const oneTimePasscodeRequired = authState.loginError?.response?.status === 400 || false;
    if (oneTimePasscodeRequired) {
        return (
            <LoginPage>
                <OneTimePasscodeForm
                    onSubmit={handleSubmitLoginWithOneTimePasscodeForm}
                    onCancel={resetForm}
                    loading={authState.loginLoading}
                />
            </LoginPage>
        );
    }

    if (listSSOProvidersQuery.isError || !listSSOProvidersQuery.data) {
        return (
            <LoginPage>
                <LoginForm onSubmit={handleSubmitLoginForm} loading={authState.loginLoading} />
            </LoginPage>
        );
    }

    if (useSSO) {
        if (listSSOProvidersQuery.data?.length === 1) {
            handleSubmitLoginViaSSOForm(listSSOProvidersQuery.data[0].slug);
            return;
        }
        return (
            <LoginPage>
                <LoginViaSSOForm
                    providers={listSSOProvidersQuery.data}
                    onSubmit={handleSubmitLoginViaSSOForm}
                    onCancel={resetForm}
                />
            </LoginPage>
        );
    }

    return (
        <LoginPage>
            <LoginForm
                onSubmit={handleSubmitLoginForm}
                onLoginViaSSO={() => setUseSSO(true)}
                loading={authState.loginLoading}
            />
        </LoginPage>
    );
};

export default Login;
