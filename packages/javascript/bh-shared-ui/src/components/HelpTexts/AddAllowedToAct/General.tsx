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
import { EdgeInfoProps } from '../index';
import { groupSpecialFormat } from '../utils';

const General: FC<EdgeInfoProps> = ({ sourceName, sourceType, targetName }) => {
    return (
        <>
            <Typography variant='body2'>
                {groupSpecialFormat(sourceType, sourceName)} can modify the msds-AllowedToActOnBehalfOfOtherIdentity
                attribute on the computer {targetName}.
            </Typography>

            <Typography variant='body2'>
                The ability to modify the msDS-AllowedToActOnBehalfOfOtherIdentity property allows an attacker to abuse
                resource-based constrained delegation to compromise the remote computer system. This property is a
                binary DACL that controls what security principals can pretend to be any domain user to the particular
                computer object.
            </Typography>

            <Typography variant='body2'>
                If the msDS-AllowedToActOnBehalfOfOtherIdentity DACL is set to allow an attack-controller account, the
                attacker can use said account to execute a modified S4U2self/S4U2proxy abuse chain to impersonate any
                domain user to the target computer system and receive a valid service ticket "as" this user.
            </Typography>

            <Typography variant='body2'>
                One caveat is that impersonated users can not be in the "Protected Users" security group or otherwise
                have delegation privileges revoked. Another caveat is that the principal added to the
                msDS-AllowedToActOnBehalfOfOtherIdentity DACL *must* have a service principal name (SPN) set in order to
                successfully abuse the S4U2self/S4U2proxy process. If an attacker does not currently control an account
                with a SPN set, an attacker can abuse the default domain MachineAccountQuota settings to add a computer
                account that the attacker controls via the Powermad project.
            </Typography>
        </>
    );
};

export default General;
