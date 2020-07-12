const express = require('express');
const router = express.Router();
const validators = require('../../validators/auth-validator');
const candidateService = require('../../services/candidate.service');

router.get('/', validators.isAuthenticated, async (req, res, next) => {
    try {
        const candidates = await candidateService.ListCandidates();
        return res.json({
            success: true,
            candidates: candidates
        });
    }
    catch (err) {
        return next(err);
    }
});

router.get('/:id', validators.isAuthenticated, async (req, res, next) => {
    try {
        const candidate = await candidateService.GetCandidate(req.params.id);
        return res.json({
            success: true,
            candidate: candidate
        });
    }
    catch (err) {
        return next(err);
    }
});

module.exports = router;