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

import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogDescription,
    DialogOverlay,
    DialogPortal,
    DialogTitle,
    Input,
} from '@bloodhoundenterprise/doodleui';
import React, { useCallback, useState } from 'react';

const ConfirmationDialog: React.FC<{
    open: boolean;
    title: string;
    text: string | JSX.Element;
    onCancel: () => void;
    onConfirm: () => void;
    challengeTxt?: string;
    isLoading?: boolean;
    error?: string;
}> = ({ open, title, text, onCancel, isLoading, error, challengeTxt = '', onConfirm }) => {
    const [challengeTxtReply, setChallengeTxtReply] = useState<string>('');

    const handleClose = useCallback(() => {
        onCancel();
        setTimeout(() => {
            setChallengeTxtReply('');
        }, 1000);
    }, [onCancel]);

    const handleConfirm = useCallback(() => {
        onConfirm();
        setTimeout(() => {
            setChallengeTxtReply('');
        }, 1000);
    }, [onConfirm]);

    return (
        <Dialog open={open} data-testid='confirmation-dialog'>
            <DialogPortal>
                {/*
                 *   Sometimes we have a confirmation modal launching over a primary modal
                 *   (As in UpdateAzurehoundClientDialog -> delete schedule)
                 *   However, the outer modal is MUI, whose z-index is 1300,
                 *   While the second ConfirmationModal is Doodle, which uses tailwind z-50.
                 *   Therefore, the second, more urgent modal, is hidden behind the primary modal.
                 *   For now, overriding the styles on the confirmation modal and assuming it
                 *   should have priority over all other modals seems like a reasonable solution.
                 *   When we remove all MUI dialogs down the road, we may want a prettier solution.
                 */}
                <DialogOverlay className='z-[1300]' />
                <DialogContent className='z-[1400]'>
                    <DialogTitle className='text-lg'>{title}</DialogTitle>
                    <DialogDescription className='text-lg'>{text}</DialogDescription>
                    {challengeTxt && (
                        <>
                            <DialogDescription className='text-sm'>
                                Please input "{challengeTxt}" prior to clicking confirm.
                                <Input
                                    placeholder={challengeTxt}
                                    className='border-t-0 border-l-0 border-r-0 rounded-none border-black dark:border-white bg-transparent dark:bg-transparent placeholder-neutral-dark-10 dark:placeholder-neutral-light-10 focus-visible:ring-0 focus-visible:ring-offset-0 pl-2'
                                    onChange={(e) => setChallengeTxtReply(e.target.value)}
                                    value={challengeTxtReply}
                                    data-testid='confirmation-dialog_challenge-text'
                                />
                            </DialogDescription>
                        </>
                    )}
                    <DialogActions>
                        {error && <p className='content-center text-[color:#d32f2f] text-xs mt-[3px]'>{error}</p>}
                        <Button
                            variant='tertiary'
                            onClick={handleClose}
                            disabled={isLoading}
                            data-testid='confirmation-dialog_button-no'>
                            Cancel
                        </Button>
                        <Button
                            onClick={handleConfirm}
                            disabled={isLoading || challengeTxt.toLowerCase() !== challengeTxtReply.toLowerCase()}
                            data-testid='confirmation-dialog_button-yes'>
                            Confirm
                        </Button>
                    </DialogActions>
                </DialogContent>
            </DialogPortal>
        </Dialog>
    );
};

export default ConfirmationDialog;
