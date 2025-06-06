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

import { Typography } from '@mui/material';
import { FC } from 'react';

const Abuse: FC = () => {
    return (
        <Typography variant='body2'>
            An attacker may perform several attacks that rely on certificates being stored in the NTAuthStore, such as
            ESC1. This relationship alone is not enough to escalate rights or impersonate other principals. This
            relationship may contribute to other relationships and attributes, from which an escalation opportunity may
            emerge.
        </Typography>
    );
};

export default Abuse;
