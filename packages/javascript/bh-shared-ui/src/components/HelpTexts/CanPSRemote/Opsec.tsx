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

const Opsec: FC = () => {
    return (
        <>
            <Typography variant='body2'>
                When using the PowerShell functions, keep in mind that PowerShell v5 introduced several security
                mechanisms that make it much easier for defenders to see what's going on with PowerShell in their
                network, such as script block logging and AMSI.
            </Typography>
            <Typography variant='body2'>
                Entering a PSSession will generate a logon event on the target computer.
            </Typography>
        </>
    );
};

export default Opsec;
