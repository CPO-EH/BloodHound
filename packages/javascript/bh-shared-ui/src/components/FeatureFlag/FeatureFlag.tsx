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

import { useFeatureFlag } from '../../hooks/useFeatureFlags';

type FeatureFlagProps = {
    flagKey: string;
    loadingFallback?: JSX.Element | null;
    errorFallback?: JSX.Element | null;
    enabled?: JSX.Element | null;
    disabled?: JSX.Element | null;
};

const FeatureFlag = ({
    flagKey,
    loadingFallback = <span>Loading...</span>,
    errorFallback = <span>Error</span>,
    enabled = null,
    disabled = null,
}: FeatureFlagProps) => {
    const { data: flag, isLoading, isError, error } = useFeatureFlag(flagKey);

    if (isLoading) {
        return loadingFallback;
    }

    if (isError) {
        console.error(error);
        return errorFallback;
    }

    if (flag === undefined) {
        console.error(`Feature flag "${flagKey}" not found`);
        return errorFallback;
    }

    if (flag.enabled) {
        return enabled;
    } else {
        return disabled;
    }
};

export default FeatureFlag;
