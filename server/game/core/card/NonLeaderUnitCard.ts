import Player from '../Player';
import { WithPrintedHp } from './propertyMixins/PrintedHp';
import { WithCost } from './propertyMixins/Cost';
import { WithPrintedPower } from './propertyMixins/PrintedPower';
import { InitiateAttackAction } from '../../actions/InitiateAttackAction';
import { PlayUnitAction } from '../../actions/PlayUnitAction';
import Contract from '../utils/Contract';
import { CardType, KeywordName, Location } from '../Constants';
import { WithDamage } from './propertyMixins/Damage';
import { PlayableOrDeployableCard } from './baseClasses/PlayableOrDeployableCard';
import { WithUnitProperties } from './propertyMixins/UnitProperties';
import { InPlayCard } from './baseClasses/InPlayCard';
import { WithStandardAbilitySetup } from './propertyMixins/StandardAbilitySetup';
import { Card } from './Card';
import { SmuggleUnitAction } from '../../actions/SmuggleUnitAction';

const NonLeaderUnitCardParent = WithUnitProperties(WithCost(WithStandardAbilitySetup(InPlayCard)));

export class NonLeaderUnitCard extends NonLeaderUnitCardParent {
    public constructor(owner: Player, cardData: any) {
        super(owner, cardData);

        // superclasses check that we are a unit, check here that we are a non-leader unit
        Contract.assertFalse(this.printedType === CardType.Leader);

        this.defaultActions.push(new PlayUnitAction(this));
        // TODO: add smuggle action here
        if (this.hasSomeKeyword(KeywordName.Smuggle)) {
            this.defaultActions.push(new SmuggleUnitAction(this));
        }
    }

    public override isNonLeaderUnit(): this is NonLeaderUnitCard {
        return true;
    }

    protected override initializeForCurrentLocation(prevLocation: Location): void {
        super.initializeForCurrentLocation(prevLocation);

        switch (this.location) {
            case Location.GroundArena:
            case Location.SpaceArena:
                this.enableDamage(true);
                this.enableExhaust(true);
                break;

            case Location.Resource:
                this.enableDamage(false);
                this.enableExhaust(true);
                break;

            default:
                this.enableDamage(false);
                this.enableExhaust(false);
                break;
        }
    }
}
