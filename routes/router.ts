import { Router, Request, Response} from 'express'

const router = Router();


router.get('/', (req: Request, res: Response) => {
    res.json({
        status: 200,
        ok: true,
        autor: "Eduardo Lemus Laguna",
        version: "1.0.0"
    });
});

export default router;