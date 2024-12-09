import AbilityHelper from '../../../AbilityHelper';
import { NonLeaderUnitCard } from '../../../core/card/NonLeaderUnitCard';
import { RelativePlayer, TargetMode, WildcardCardType } from '../../../core/Constants';
import * as Helpers from '../../../core/utils/Helpers';

export default class FinalizerMightOfTheFirstOrder extends NonLeaderUnitCard {
    protected override getImplementationId() {
        return {
            id: '9752523457',
            internalName: 'finalizer#might-of-the-first-order',
        };
    }

    public override setupCardAbilities() {
        this.addWhenPlayedAbility({
            title: 'Choose any number of friendly units. Each of those units captures an enemy non-leader unit in the same arena.',
            targetResolver: {
                mode: TargetMode.Unlimited,
                controller: RelativePlayer.Self,
                cardTypeFilter: WildcardCardType.Unit,
                immediateEffect: AbilityHelper.immediateEffects.simultaneous((context) => {
                    const captureEffects = [];
                    for (const captor of Helpers.asArray(context.target)) {
                        captureEffects.push(AbilityHelper.immediateEffects.selectCard({
                            controller: RelativePlayer.Opponent,
                            innerSystem: AbilityHelper.immediateEffects.capture({ captor })
                        }));
                    }
                    return captureEffects;
                })
            }
        });
    }
}

FinalizerMightOfTheFirstOrder.implemented = true;