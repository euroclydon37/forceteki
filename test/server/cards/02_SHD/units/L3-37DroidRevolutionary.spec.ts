describe('L3-37, Droid Revolutionary ability', function() {
    integration(function(contextRef) {
        describe('L3-37, Droid Revolutionary\'s when played ability', function() {
            beforeEach(function () {
                contextRef.setupTest({
                    phase: 'action',
                    player1: {
                        hand: ['take-captive'],
                        spaceArena: ['tieln-fighter']
                    },
                    player2: {
                        spaceArena: ['wing-leader'],
                        hand: ['l337#droid-revolutionary']
                    }
                });

                const { context } = contextRef;

                // SETUP: P1 Captures Wing Leader with Tie/LN
                context.player1.clickCard(context.takeCaptive);

                expect(context.wingLeader).toBeCapturedBy(context.tielnFighter);
            });

            it('rescue a unit and no shield given', function() {
                const { context } = contextRef;

                // P2 Rescues Wing Leader with L3-37
                context.player2.clickCard(context.l337DroidRevolutionary);
                expect(context.player2).toHavePassAbilityPrompt('Rescue a captured card');

                context.player2.clickPrompt('Rescue a captured card');
                expect(context.wingLeader).toBeInZone('spaceArena');
                expect(context.l337DroidRevolutionary.isUpgraded()).toBeFalse(); // no shield
            });

            it('does not rescue a unit and is shielded', function() {
                const { context } = contextRef;

                context.player2.clickCard(context.l337DroidRevolutionary);
                expect(context.player2).toHavePassAbilityPrompt('Rescue a captured card');

                context.player2.clickPrompt('Pass');

                expect(context.wingLeader).toBeCapturedBy(context.tielnFighter);
                expect(context.player1).toBeActivePlayer();
                expect(context.l337DroidRevolutionary).toHaveExactUpgradeNames(['shield']);
            });
        });
    });
});
