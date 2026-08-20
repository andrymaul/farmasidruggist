import { resolveDrugFromDDInter, resolveInteractionPair, evaluateTherapeuticDuplications, evaluateFoodInteractions } from '../src/utils/ddinterEngine';
import { INITIAL_DRUGS, INITIAL_INTERACTIONS, SAMPLE_THERAPEUTIC_DUPLICATIONS, SAMPLE_FOOD_INTERACTIONS } from '../src/data/ddinterData';

function runTests() {
  console.log('====================================================');
  console.log('🧪 RUNNING DDINTER PHARMACOLOGY ENGINE TEST SUITE');
  console.log('====================================================\n');

  let passed = 0;
  let failed = 0;

  function assert(condition: boolean, testName: string) {
    if (condition) {
      console.log(`  ✅ PASS: ${testName}`);
      passed++;
    } else {
      console.error(`  ❌ FAIL: ${testName}`);
      failed++;
    }
  }

  // TEST 1: Exact Drug Match in Catalogue
  console.log('Test Suite 1: resolveDrugFromDDInter()');
  const warfarin = resolveDrugFromDDInter('Warfarin', INITIAL_DRUGS);
  assert(warfarin.id === 'drug-warfarin' && warfarin.name === 'Warfarin', 'Exact match for Warfarin');

  // TEST 2: Brand Name Match
  const aspiletMatch = resolveDrugFromDDInter('Aspilet', INITIAL_DRUGS);
  assert(aspiletMatch.id === 'drug-aspirin', 'Brand name "Aspilet" resolves to Aspirin');

  // TEST 3: Dynamic Fallback for Unlisted Drug
  const dynamicMatch = resolveDrugFromDDInter('Sildenafil', INITIAL_DRUGS);
  assert(dynamicMatch.name === 'Sildenafil' && dynamicMatch.ddinterId.startsWith('DDInter-'), 'Dynamic DDInter lookup for unlisted drug Sildenafil');

  // TEST 4: Direct DDI Pair Matching
  console.log('\nTest Suite 2: resolveInteractionPair()');
  const aspirin = resolveDrugFromDDInter('Aspirin', INITIAL_DRUGS);
  const interaction = resolveInteractionPair(warfarin, aspirin, INITIAL_INTERACTIONS);
  assert(interaction !== null && interaction.severity === 'Major', 'Direct DDI match Warfarin + Aspirin (Major)');

  // TEST 5: Rule-Based DDI Inference (CYP3A4 + Statin)
  const ketoconazole = resolveDrugFromDDInter('Ketoconazole', INITIAL_DRUGS);
  const atorvastatin = resolveDrugFromDDInter('Atorvastatin', INITIAL_DRUGS);
  const inferredDdi = resolveInteractionPair(ketoconazole, atorvastatin, INITIAL_INTERACTIONS);
  assert(inferredDdi !== null && inferredDdi.severity === 'Major', 'Rule-based DDI inference: Ketoconazole + Atorvastatin (Major)');

  // TEST 6: Therapeutic Duplication Detection
  console.log('\nTest Suite 3: evaluateTherapeuticDuplications()');
  const ibuprofen = resolveDrugFromDDInter('Ibuprofen', INITIAL_DRUGS);
  const mefenamic = resolveDrugFromDDInter('Mefenamic Acid', INITIAL_DRUGS);
  const duplications = evaluateTherapeuticDuplications([ibuprofen, mefenamic], SAMPLE_THERAPEUTIC_DUPLICATIONS);
  assert(duplications.length > 0, 'Detect NSAID therapeutic duplication (Ibuprofen + Mefenamic Acid)');

  // TEST 7: Drug-Food Interaction Detection
  console.log('\nTest Suite 4: evaluateFoodInteractions()');
  const simvastatin = resolveDrugFromDDInter('Simvastatin', INITIAL_DRUGS);
  const foodInteractions = evaluateFoodInteractions([simvastatin, warfarin], SAMPLE_FOOD_INTERACTIONS);
  assert(foodInteractions.length >= 2, 'Detect Drug-Food interactions for Simvastatin & Warfarin');

  console.log('\n====================================================');
  console.log(`📊 TEST RESULTS SUMMARY: ${passed} PASSED, ${failed} FAILED`);
  console.log('====================================================\n');

  if (failed > 0) {
    process.exit(1);
  }
}

runTests();
