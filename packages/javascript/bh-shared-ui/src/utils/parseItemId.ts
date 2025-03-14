// Copyright 2025 Specter Ops, Inc.
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

export const parseItemId = (itemId: string) => {
    // Edge identifiers can be either `rel_<sourceNodeId>_<edgeKind>_<targetNodeId>`...
    let match = itemId.match(/^(?:rel_)?(\d+)_(.+)_(\d+)$/);
    if (match) {
        return {
            itemType: 'edge',
            cypherQuery: `MATCH p=(s)-[r:${match[2]}]->(t) WHERE ID(s) = ${match[1]} AND ID(t) = ${match[3]}  RETURN p LIMIT 1`,
        };
    }

    // or `rel_<edgeId>`...
    match = itemId.match(/^rel_(\d+)$/);
    if (match) {
        return {
            itemType: 'edge',
            cypherQuery: `MATCH p=()-[r]->() WHERE ID(r) = ${match[1]} RETURN p LIMIT 1`,
        };
    }

    // otherwise it is a node identifier
    return {
        itemType: 'node',
        cypherQuery: `MATCH (n) WHERE ID(n) = ${itemId} RETURN n LIMIT 1`,
    };
};
